import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleList } from '@/entities/Article';
import { getPageScrollByPath } from '@/entities/Page';

import {
  getArticlesPageAreLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { getArticles } from '../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
  const location = useLocation();

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollByPath(state, location.pathname),
  );

  return (
    <ArticleList
      articles={articles}
      className={className}
      isLoading={isLoading}
      scrollPosition={scrollPosition}
      view={view}
    />
  );
});

ArticleInfiniteList.displayName = 'ArticleInfiniteList';
