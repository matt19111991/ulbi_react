import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  view?: ArticleView,
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.PLATE ? 9 : 3)
  .fill(0)
  .map((_, idx) => (
    <ArticleListItemSkeleton
      className={classes.card}
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      view={view}
    />
  ));

export const ArticleList = memo(({
  articles,
  className,
  isLoading,
  view = ArticleView.PLATE,
}: ArticleListProps) => {
  if (isLoading) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      className={classes.card}
      key={article.id}
      view={view}
    />
  );

  return (
    <div className={classNames('', {}, [className, classes[view]])}>
      {articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});

ArticleList.displayName = 'ArticleList';
