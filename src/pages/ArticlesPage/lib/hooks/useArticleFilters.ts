import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

import { SortOrder } from '@/shared/types/sort';

import {
  getArticlesPageAreLoading,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

import { articlesPageActions } from '../../model/slice/articlesPageSlice';

export const useArticleFilters = () => {
  const dispatch = useAppDispatch();

  const areLoading = useSelector(getArticlesPageAreLoading);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const sort = useSelector(getArticlesPageSort);
  const type = useSelector(getArticlesPageType);
  const view = useSelector(getArticlesPageView);

  /**
   * Получение данных
   */
  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  /**
   * Получение данных отложенно
   */
  const debouncedFetchData = useDebounce(fetchData, 500);

  /**
   * Обработчик изменения направления сортировки
   */
  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  /**
   * Обработчик изменения поля поиска
   */
  const onChangeSearch = useCallback(
    (searchValue: string) => {
      dispatch(articlesPageActions.setSearch(searchValue));

      dispatch(articlesPageActions.setPage(1));

      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  /**
   * Обработчик изменения поля для сортировки
   */
  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  /**
   * Обработчик изменения типа статьи
   */
  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  /**
   * Обработчик изменения вида статей
   */
  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView));
    },
    [dispatch],
  );

  return {
    areLoading,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  };
};
