import { memo } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';

import {
  getArticlesPageAreLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { getArticles } from '../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  return (
    <ArticleList articles={articles} className={className} isLoading={isLoading} view={view} />
  );
});

ArticleInfiniteList.displayName = 'ArticleInfiniteList';
