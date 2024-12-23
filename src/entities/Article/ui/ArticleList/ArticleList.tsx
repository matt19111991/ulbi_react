import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { HTMLAttributeAnchorTarget, JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, List } from 'react-virtualized';
import type { ListRowProps } from 'react-virtualized';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { ArticleView } from '../../model/consts/articleConsts';

import type { Article } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleSkeleton {
  /**
   * 'ID' скелетона
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
   * Открытие в новой вкладке (у списка рекомендаций 'target === _blank')
   */
  target?: HTMLAttributeAnchorTarget;

  /**
   * Вид списка статей
   */
  view?: ArticleView;

  /**
   * Состояние виртуализации (для рекомендаций состояние: 'false')
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
        // 'recommendations block'
        if (target === '_blank') {
          setSkeletonsAmount(3);
        } else if (view === ArticleView.PLATE) {
          setSkeletonsAmount(9);
        } else {
          setSkeletonsAmount(1);
        }

        // неважно, чем заполнять
        const skeletons: ArticleSkeleton[] = new Array(skeletonsAmount).fill(0).map((_, idx) => ({
          id: String(`skeleton-${idx}`),
        }));

        setArticleItems((prev) => [...prev, ...skeletons]);
      } else {
        setSkeletonsAmount(0);

        setArticleItems((prev) => prev.filter((articleBlock) => 'title' in articleBlock));
      }
    }, [isLoading, skeletonsAmount, target, view]);

    const pageNodeWidthWithPossibleIndents = useMemo<number>(
      () => pageNode?.getBoundingClientRect().width || 0, // страница с 'padding'
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pageNode, windowWidth],
    );

    // у '.Page' класса нужно учитывать отступы слева и справа
    const pageNodeResultWidth = toggleFeatures({
      name: 'isAppRedesigned',
      on: () =>
        /*
          для новых компонентов у '.Page' класса нет этих отступов, дополнительный отступ добавляем
          в зависимости от ширины экрана и только для 'ArticleView.PLATE'
        */
        pageNodeWidthWithPossibleIndents +
        (ArticleView.PLATE && (windowWidth <= 360 || windowWidth > 1800) ? 16 : 0),

      // не учитываем отступы справа и слева для устаревших компонентов
      off: () => pageNodeWidthWithPossibleIndents - 20 - 45,
    });

    // размер карточки, + 'gap' между карточками
    const cardSizeWithGap = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (windowWidth > 360 ? 233 : 210) + 16,
      off: () => 230 + 30,
    });

    const itemsPerRow =
      view === ArticleView.LIST
        ? 1 // один элемент на строку
        : Math.floor(pageNodeResultWidth / cardSizeWithGap); // страница без 'padding' / размер карточки

    let rowCount = 1; // всегда отрисовывается как минимум одна строка

    // 'recommendations block'
    if (target === '_blank') {
      rowCount = 1;
      // 'list view'
    } else if (view === ArticleView.LIST) {
      rowCount = articleItems.length;
      // 'plate view'
    } else if (itemsPerRow) {
      // количество всех статей делим на количество статей в строку
      rowCount = Math.ceil(articleItems.length / itemsPerRow);
    }

    const rowRenderer = useCallback(
      ({ index, key, style }: ListRowProps): ReactNode => {
        const items: JSX.Element[] = [];
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
                key={articleItem.id} // иначе ошибки в режиме 'плитки'
                target={target}
                view={view}
              />,
            );
          } else {
            items.push(
              <ArticleListItemSkeleton
                className={classes.card}
                key={articleItem.id} // иначе ошибки в режиме 'плитки'
                view={view}
              />,
            );
          }
        }

        const containerClass = toggleFeatures({
          name: 'isAppRedesigned',
          on: () => classNames(classes.rowRedesigned, {}, [classes[view]]),
          off: () => classes.rowDeprecated,
        });

        return (
          <div className={containerClass} key={key} style={style}>
            {items}
          </div>
        );
      },
      [articleItems, itemsPerRow, target, view],
    );

    if (!isLoading && !articles.length) {
      return (
        <HStack className={classNames('', {}, [className])} justify='center' max>
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<TextRedesigned variant='error' title={t('Статьи не найдены')} />}
            off={<TextDeprecated theme={TextTheme.ERROR} title={t('Статьи не найдены')} />}
          />
        </HStack>
      );
    }

    // 'recommendations block'
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
        // неважно, чем заполнять
        new Array(skeletonsAmount).fill(0).map((_, idx) => (
          <ArticleListItemSkeleton
            className={classes.card}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            view={view}
          />
        ));

      const content: JSX.Element = (
        <>
          {articles.length ? articles.map(renderArticle) : null}

          {isLoading && renderSkeletons()}
        </>
      );

      return (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <HStack className={classNames(classes.inlineRedesigned, {}, [className])} gap='16' max>
              {content}
            </HStack>
          }
          off={
            <div className={classNames(classes.inline, {}, [className, classes[view]])}>
              {content}
            </div>
          }
        />
      );
    }

    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <HStack className={classNames('', {}, [className])} data-testid='ArticleList'>
            {/*
             'AutoSizer' сохраняет высоту и ширину виртуализированного списка;
              можно проскроллить список, уйти со страницы со списком и вернуться на последнюю
              позицию в списке

             'disableHeight' - отключаем динамическую высоту (иначе не подгружаются статьи)
            */}
            <AutoSizer disableHeight>
              {({ width }) => {
                const rowHeight = view === ArticleView.LIST ? 664 : 362;

                return (
                  <List
                    height={rowCount * rowHeight}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                    width={width}
                  />
                );
              }}
            </AutoSizer>
          </HStack>
        }
        off={
          <div className={classNames('', {}, [className])} data-testid='ArticleList'>
            {/*
             'AutoSizer' сохраняет высоту и ширину виртуализированного списка;
              можно проскроллить список, уйти со страницы со списком и вернуться на последнюю
              позицию в списке

             'disableHeight' - отключаем динамическую высоту (иначе не подгружаются статьи)
            */}
            <AutoSizer disableHeight>
              {({ width }) => {
                const rowHeight = view === ArticleView.LIST ? 700 : 330;

                return (
                  <List
                    height={rowCount * rowHeight}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                    width={width}
                  />
                );
              }}
            </AutoSizer>
          </div>
        }
      />
    );
  },
);

ArticleList.displayName = 'ArticleList';
