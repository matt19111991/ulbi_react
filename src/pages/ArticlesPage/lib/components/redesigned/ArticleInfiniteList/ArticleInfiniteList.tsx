import { memo } from 'react';
import { useSelector } from 'react-redux';
import { setGlobalDevModeChecks } from 'reselect';

import { ArticleList } from '@/entities/Article';

import {
  getArticlesPageAreLoading,
  getArticlesPageView,
} from '../../../../model/selectors/articlesPageSelectors';

import { getArticles } from '../../../../model/slice/articlesPageSlice';

interface ArticleInfiniteListProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
  /*
    селектор 'getArticles' из 'createEntityAdapter' предоставляет свои методы
    для получения стейта, можно не писать селекторы вручную для 'ids' или 'entities',
    но для кастомных полей 'isLoading' и 'view' нужны отдельные селекторы
  */
  const articles = useSelector(getArticles.selectAll);

  /*
    включаем отключенные ранее предупреждения вида: "An input selector returned
    a different result when passed same arguments. This means your output
    selector will likely run more frequently than intended. Avoid returning a
    new reference inside your input selector, e.g.
      'createSelector(
        [state => state.articles.map(article => article.id)],
        articleIds => articleIds.length
      )' при использовании 'createEntityAdapter'
  */
  setGlobalDevModeChecks({ inputStabilityCheck: 'always' });

  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  return (
    <ArticleList articles={articles} className={className} isLoading={isLoading} view={view} />
  );
});

ArticleInfiniteList.displayName = 'ArticleInfiniteList';
