import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ArticleList } from 'entities/Article';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import {
  getArticlesPageAreLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { getArticles } from '../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo(({
  className,
}: ArticleInfiniteListProps) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <ArticleList
      articles={articles}
      className={className}
      isLoading={isLoading}
      view={view}
    />
  );
});

ArticleInfiniteList.displayName = 'ArticleInfiniteList';
