import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

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

import classes from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const areLoading = useSelector(getArticlesPageAreLoading);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const sort = useSelector(getArticlesPageSort);
  const type = useSelector(getArticlesPageType);
  const view = useSelector(getArticlesPageView);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (searchValue: string) => {
      dispatch(articlesPageActions.setSearch(searchValue));

      dispatch(articlesPageActions.setPage(1));

      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));

      dispatch(articlesPageActions.setPage(1));

      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeView = useCallback(
    (newView: ArticleView) => {
      dispatch(articlesPageActions.setView(newView));
    },
    [dispatch],
  );

  return (
    <div className={classNames('', {}, [className])}>
      <div className={classes.sortWrapper}>
        <ArticleSortSelector
          className={classNames('', { [classes.loading]: areLoading })}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
          order={order}
          sort={sort}
        />

        <ArticleViewSelector onViewClick={onChangeView} selectedView={view} />
      </div>

      <Card className={classes.search}>
        <Input
          className={classNames('', { [classes.loading]: areLoading })}
          fullWidth
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
          value={search}
        />
      </Card>

      <ArticleTypeTabs
        className={classNames(classes.tabs, { [classes.loading]: areLoading })}
        onChangeType={onChangeType}
        value={type}
      />
    </div>
  );
});

ArticlesPageFilters.displayName = 'ArticlesPageFilters';
