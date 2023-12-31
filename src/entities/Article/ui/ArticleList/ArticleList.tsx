import { HTMLAttributeAnchorTarget, memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, List, ListRowProps, WindowScroller } from 'react-virtualized';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { ArticleView } from '../../model/consts/articleConsts';

import { Article } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleSkeleton {
  /**
   * ID скелетона
   */
  id: string;
}

type ArticleBlock = Article | ArticleSkeleton;

interface ArticleListProps {
  /**
   * Список статей
   */
  articles: Article[];

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Состояние загрузки
   */
  isLoading?: boolean;

  /**
   * При target === '_blank' отрисовываем список рекомендаций
   */
  target?: HTMLAttributeAnchorTarget;

  /**
   * Вид списка статей
   */
  view?: ArticleView;

  /**
   * Состояние виртуализации
   */
  virtualized?: boolean;
}

export const ArticleList = memo(
  ({
    articles,
    className,
    isLoading,
    target,
    view = ArticleView.PLATE,
    virtualized = true,
  }: ArticleListProps) => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();

    const [articleItems, setArticleItems] = useState<ArticleBlock[]>(articles);
    const [skeletonsAmount, setSkeletonsAmount] = useState<number>(0);

    const pageNodeId = __PROJECT__ === 'storybook' ? 'storybook-root' : PAGE_ID;

    const pageNode = document.getElementById(pageNodeId) as Element;

    useEffect(() => {
      setArticleItems(articles);
    }, [articles]);

    useEffect(() => {
      if (isLoading) {
        // recommendations block
        if (target === '_blank') {
          setSkeletonsAmount(3);
        } else if (view === ArticleView.PLATE) {
          setSkeletonsAmount(9);
        } else {
          setSkeletonsAmount(1);
        }

        const skeletons: ArticleSkeleton[] = new Array(skeletonsAmount).fill(0).map((_, idx) => ({
          id: String(`skeleton-${idx}`),
        }));

        setArticleItems((prev) => [...prev, ...skeletons]);
      } else {
        setSkeletonsAmount(0);

        setArticleItems((prev) => prev.filter((articleBlock) => 'title' in articleBlock));
      }
    }, [isLoading, skeletonsAmount, target, view]);

    const pageNodeWidthWithIndents = useMemo<number>(
      () => pageNode?.getBoundingClientRect().width || 105, // страница с padding
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pageNode, windowWidth],
    );

    const pageNodeWidthWithoutIndents = pageNodeWidthWithIndents - 20 - 45; // страница без padding

    // размер карточки, + gap между карточками
    const cardSizeWithGap = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => 206 + 16,
      off: () => 230 + 30,
    });

    const itemsPerRow =
      view === ArticleView.LIST
        ? 1 // один элемент на строку
        : Math.floor(pageNodeWidthWithoutIndents / cardSizeWithGap); // страница без padding / размер карточки

    let rowCount = 1; // всегда отрисовывается как минимум одна строка

    // recommendations block
    if (target === '_blank') {
      rowCount = 1;
      // list view
    } else if (view === ArticleView.LIST) {
      rowCount = articleItems.length;
      // plate view
    } else if (itemsPerRow) {
      // количество всех статей делим на количество статей в строку
      rowCount = Math.ceil(articleItems.length / itemsPerRow);
    }

    const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => {
      const items = [];
      // от какого и до какого индекса рендерим элементы
      const fromIndex = index * itemsPerRow;

      /*
        articleItems.length: 100, itemsPerRow: 10, fromIndex: 0 * 10  (0)   => toIndex: 0   + 10 (10)
        articleItems.length: 100, itemsPerRow: 10, fromIndex: 4 * 10  (40)  => toIndex: 40  + 10 (50)
        articleItems.length: 105, itemsPerRow: 10, fromIndex: 10 * 10 (100) => toIndex: 100 + 10 (110 > articleItems.length)
      */
      const toIndex = Math.min(fromIndex + itemsPerRow, articleItems.length);

      for (let i = fromIndex; i < toIndex; i++) {
        const articleItem = articleItems[i];

        if ('title' in articleItem) {
          items.push(
            <ArticleListItem
              article={articleItem}
              className={classes.card}
              key={`${articleItem.id}${i}`} // иначе ошибки в режиме 'плитки'
              target={target}
              view={view}
            />,
          );
        } else {
          items.push(
            <ArticleListItemSkeleton
              className={classes.card}
              key={`${articleItem.id}${i}`} // иначе ошибки в режиме 'плитки'
              view={view}
            />,
          );
        }
      }

      const containerClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => classes.rowRedesigned,
        off: () => classes.rowDeprecated,
      });

      return (
        <div className={containerClass} key={key} style={style}>
          {items}
        </div>
      );
    };

    if (!isLoading && !articles.length) {
      return (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <HStack
              className={classNames('', {}, [className, classes[`${view}Redesigned`]])}
              justify='center'
              max
            >
              <TextRedesigned variant='error' title={t('Статьи не найдены')} />
            </HStack>
          }
          off={
            <HStack className={classNames('', {}, [className, classes[view]])} justify='center' max>
              <TextDeprecated theme={TextTheme.ERROR} title={t('Статьи не найдены')} />
            </HStack>
          }
        />
      );
    }

    // recommendations block
    if (!virtualized) {
      const renderArticle = (article: Article) => (
        <ArticleListItem
          article={article}
          className={classes.card}
          key={article.id}
          target={target}
          view={view}
        />
      );

      const renderSkeletons = () =>
        new Array(skeletonsAmount).fill(0).map((_, idx) => (
          <ArticleListItemSkeleton
            className={classes.card}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            view={view}
          />
        ));

      return (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <HStack gap='16' className={classNames(classes.inlineRedesigned, {})} wrap='wrap'>
              {articles.length ? articles.map(renderArticle) : null}

              {isLoading && renderSkeletons()}
            </HStack>
          }
          off={
            <div className={classNames(classes.inline, {}, [className, classes[view]])}>
              {articles.length ? articles.map(renderArticle) : null}

              {isLoading && renderSkeletons()}
            </div>
          }
        />
      );
    }

    return (
      <WindowScroller
        // убираем собственный скролл у списка, скролл будет только у страницы
        scrollElement={pageNode}
      >
        {({
          // без 'scrollTop' с каждой подгрузкой все больше увеличивается пустое пространство снизу
          scrollTop,
        }) => (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <HStack className={classNames('', {})} data-testid='ArticleList' gap='16' wrap='wrap'>
                {articleItems.length ? (
                  /*
                    'AutoSizer' сохраняет высоту и ширину виртуализированного списка
                     Можно проскроллить список, уйти со страницы со списком и вернуться обратно на последнюю
                     позицию в списке

                     'disableHeight' - отключаем динамическую высоту
                  */
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        autoHeight // без 'autoHeight' у списка будет собственный скролл
                        height={rowCount * (ArticleView.LIST ? 664 : 362)}
                        rowCount={rowCount}
                        rowHeight={view === ArticleView.LIST ? 664 : 362}
                        rowRenderer={rowRenderer}
                        scrollTop={scrollTop}
                        // у '.Page' класса нужно учитывать 'padding' в 45px слева и 20px справа
                        width={width ?? 700}
                      />
                    )}
                  </AutoSizer>
                ) : null}
              </HStack>
            }
            off={
              <div
                className={classNames('', {}, [className, classes[view]])}
                data-testid='ArticleList'
              >
                {articleItems.length ? (
                  <AutoSizer disableHeight>
                    {({ height, width }) => (
                      <List
                        autoHeight
                        height={height ?? 700}
                        rowCount={rowCount}
                        rowHeight={view === ArticleView.LIST ? 700 : 330}
                        rowRenderer={rowRenderer}
                        scrollTop={scrollTop}
                        width={width ?? 700}
                      />
                    )}
                  </AutoSizer>
                ) : null}
              </div>
            }
          />
        )}
      </WindowScroller>
    );
  },
);

ArticleList.displayName = 'ArticleList';
