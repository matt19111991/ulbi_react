import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';

import { classNames } from 'shared/lib/classNames/classNames';

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

  // const itemsPerRow = view === ArticleView.LIST ? 1 : 3;
  // const rowCount = view === ArticleView.LIST ? 1 : 3;

  const rowRenderer = ({ index, key, style }: ListRowProps): ReactNode => (
    <div key={key} style={style}>
      <ArticleListItem
        article={articles[index]}
        className={classes.card}
        target={target}
        view={view}
      />
    </div>
  );

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
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({
          height,
          width,

//        Used by the 'Table' or "List's" onScroll prop to 'scroll' the list
          // onChildScroll,

//        Specify grid container deeper in layout (by default uses ReactDOM.findDOMNode function)
          // registerChild,

          // без 'scrollTop' с каждой подгрузкой все больше увеличивается пустое пространство снизу
          scrollTop,
      }) => (
        <div
          className={classNames('', {}, [className, classes[view]])}
          // ref={registerChild}
        >
          {articles.length
            ? (
              <List
                autoHeight // без 'autoHeight' у списка будет собственный скролл
                height={height ?? 700}
                rowCount={articles.length}
                rowHeight={700}
                rowRenderer={rowRenderer}
                scrollTop={scrollTop}
                // у '.Page' класса нужно учитывать 'padding' в 40px слева и справа
                width={width ? width - 65 : 700}

                // onChildScroll={onChildScroll}
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
