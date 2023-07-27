import {
  HTMLAttributeAnchorTarget,
  memo,
  ReactNode,
  useMemo,
} from 'react';

import { useTranslation  } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';

import { classNames } from 'shared/lib/classNames/classNames';
import { useWindowWidth } from 'shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Text } from 'shared/ui/Text/Text';

import { PAGE_ID } from 'widgets/Page/ui/Page';

import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView,
}

const getSkeletons = (target: HTMLAttributeAnchorTarget, view: ArticleView): ReactNode => {
  let skeletonsAmount = 0;

  if (target === '_blank') { // check on recommendations
    skeletonsAmount = 3;
  } else if (view === ArticleView.PLATE) {
    skeletonsAmount = 9;
  } else {
    skeletonsAmount = 4;
  }

  return new Array(skeletonsAmount)
    .fill(0)
    .map((_, idx) => (
      <ArticleListItemSkeleton
        className={classes.card}
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        view={view}
      />
    ));
};

export const ArticleList = memo(({
  articles,
  className,
  isLoading,
  target,
  view = ArticleView.PLATE,
}: ArticleListProps) => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  const pageNode = document.getElementById(PAGE_ID) as Element;

  const pageNodeWidthWithIndents = useMemo<number>(
    () => pageNode?.getBoundingClientRect().width || 105, // страница с paddings
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNode, windowWidth],
  );

  const pageNodeWidthWithoutIndents = pageNodeWidthWithIndents - 40 - 65; // страница без paddings

  const itemsPerRow = view === ArticleView.LIST
    ? 1 // один элемент на строку
    : Math.floor(pageNodeWidthWithoutIndents / 230); // страница без paddings / размер карточки

  const rowCount = view === ArticleView.LIST
    ? articles.length
    // количество всех статей делим на количество статей в строку
    : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => {
    const items = [];
    // от какого и до какого индекса рендерим элементы
    const fromIndex = index * itemsPerRow;

/*  articles.length: 100, itemsPerRow: 10, fromIndex: 0 * 10  (0)   => toIndex: 0   + 10 (10)
    articles.length: 100, itemsPerRow: 10, fromIndex: 4 * 10  (40)  => toIndex: 40  + 10 (50)
    articles.length: 105, itemsPerRow: 10, fromIndex: 10 * 10 (100) => toIndex: 100 + 10 (110 > articles.length)
*/  const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleListItem
          article={articles[index]}
          className={classes.card}
          key={`${articles[index].id}${i}`} // иначе ошибки в режиме 'плитки'
          target={target}
          view={view}
        />,
      );
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

  return (
    <WindowScroller
      // убираем собственный скролл у списка, скролл будет только у страницы
      scrollElement={pageNode}
    >
      {({
          height,
          width,
          // без 'scrollTop' с каждой подгрузкой все больше увеличивается пустое пространство снизу
          scrollTop,
      }) => (
        <div
          className={classNames('', {}, [className, classes[view]])}
        >
          {articles.length
            ? (
              <List
                autoHeight // без 'autoHeight' у списка будет собственный скролл
                height={height ?? 700}
                rowCount={rowCount}
                rowHeight={view === ArticleView.LIST ? 700 : 330}
                rowRenderer={rowRenderer}
                scrollTop={scrollTop}
                // у '.Page' класса нужно учитывать 'padding' в 40px слева и справа
                width={width ? width - 65 : 700}
              />
            )
            : null}

          {isLoading && getSkeletons(target!, view)}
        </div>
      )}
    </WindowScroller>
  );
});

ArticleList.displayName = 'ArticleList';
