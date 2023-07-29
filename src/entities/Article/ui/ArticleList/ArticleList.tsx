import {
  HTMLAttributeAnchorTarget,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslation  } from 'react-i18next';

import {
  AutoSizer,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import { classNames } from 'shared/lib/classNames/classNames';
import { useWindowWidth } from 'shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Text } from 'shared/ui/Text/Text';

import { PAGE_ID } from 'widgets/Page';

import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleSkeleton {
  id: string;
}

type ArticleBlock = Article | ArticleSkeleton;

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView;
  virtualized?: boolean;
}

export const ArticleList = memo(({
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

  const pageNode = document.getElementById(PAGE_ID) as Element;

  useEffect(() => {
    setArticleItems(articles);
  }, [articles]);

  useEffect(() => {
    if (isLoading) {
      if (target === '_blank') { // recommendations block
        setSkeletonsAmount(3);
      } else if (view === ArticleView.PLATE) {
        setSkeletonsAmount(9);
      } else {
        setSkeletonsAmount(1);
      }

      const skeletons: ArticleSkeleton[] = new Array(skeletonsAmount).fill(0).map((_, idx) => ({
        id: String(`skeleton-${idx}`),
      }));

      setArticleItems((prev) => ([...prev, ...skeletons]));
    } else {
      setSkeletonsAmount(0);

      setArticleItems(
        (prev) => prev.filter((articleBlock) => 'title' in articleBlock),
      );
    }
  }, [isLoading, skeletonsAmount, target, view]);

  const pageNodeWidthWithIndents = useMemo<number>(
    () => pageNode?.getBoundingClientRect().width || 105, // страница с padding
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNode, windowWidth],
  );

  const pageNodeWidthWithoutIndents = pageNodeWidthWithIndents - 20 - 45; // страница без padding

  const itemsPerRow = view === ArticleView.LIST
    // один элемент на строку
    ? 1
    // страница без padding / (размер карточки + gap между карточками)
    : Math.floor(pageNodeWidthWithoutIndents / (230 + 30));

  let rowCount = 1; // всегда отрисовывается как минимум одна строка

  if (target === '_blank') { // recommendations block
    rowCount = 1;
  } else if (view === ArticleView.LIST) { // list view
    rowCount = articleItems.length;
  } else if (itemsPerRow) { // plate view
    // количество всех статей делим на количество статей в строку
    rowCount = Math.ceil(articleItems.length / itemsPerRow);
  }

  const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => {
    const items = [];
    // от какого и до какого индекса рендерим элементы
    const fromIndex = index * itemsPerRow;

/*  articleItems.length: 100, itemsPerRow: 10, fromIndex: 0 * 10  (0)   => toIndex: 0   + 10 (10)
    articleItems.length: 100, itemsPerRow: 10, fromIndex: 4 * 10  (40)  => toIndex: 40  + 10 (50)
    articleItems.length: 105, itemsPerRow: 10, fromIndex: 10 * 10 (100) => toIndex: 100 + 10 (110 > articleItems.length)
*/  const toIndex = Math.min(fromIndex + itemsPerRow, articleItems.length);

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

    return (
      <div className={classes.row} key={key} style={style}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Text title={t('Статьи не найдены')} />
      </div>
    );
  }

  if (!virtualized) { // recommendations block
    const renderArticle = (article: Article) => (
      <ArticleListItem
        article={article}
        className={classes.card}
        key={article.id}
        target={target}
        view={view}
      />
    );

    const renderSkeletons = () => new Array(skeletonsAmount)
      .fill(0)
      .map((_, idx) => (
        <ArticleListItemSkeleton
          className={classes.card}
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          view={view}
        />
      ));

    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        {articles.length ? articles.map(renderArticle) : null}

        {isLoading && renderSkeletons()}
      </div>
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
        <div
          className={classNames('', {}, [className, classes[view]])}
        >
          {articleItems.length
            ? (

/*            'AutoSizer' сохраняет высоту и ширину виртуализированного списка
              Можно проскроллить список, уйти со страницы со списком и вернуться обратно на последнюю
              позицию в списке

              'disableHeight' - отключаем динамическую высоту
*/
              <AutoSizer disableHeight>
                {({ height, width }) => (
                  <List
                    autoHeight // без 'autoHeight' у списка будет собственный скролл
                    height={height ?? 700}
                    rowCount={rowCount}
                    rowHeight={view === ArticleView.LIST ? 700 : 330}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    // у '.Page' класса нужно учитывать 'padding' в 45px слева и 20px справа
                    width={width ? width - 65 : 700}
                  />
                )}
              </AutoSizer>
            )
            : null}
        </div>
      )}
    </WindowScroller>
  );
});

ArticleList.displayName = 'ArticleList';
