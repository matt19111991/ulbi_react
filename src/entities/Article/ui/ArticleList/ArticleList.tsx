import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import classes from './ArticleList.module.scss';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  view?: ArticleView,
}

export const ArticleList = memo(({
  articles,
  className,
  isLoading,
  view = ArticleView.PLATE,
}: ArticleListProps) => {
  console.log('isLoading', isLoading);

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      className={classes.card}
      key={article.id}
      view={view}
    />
  );

  return (
    <div className={classNames(classes.ArticleList, {}, [className])}>
      {articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});

ArticleList.displayName = 'ArticleList';
