import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleSortSelector, ArticleView } from 'entities/Article';

import { ArticleViewSelector } from 'features/ArticleViewSelector';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from 'shared/types/sort';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';

import {
  getArticlesPageAreLoading,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

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
  const view = useSelector(getArticlesPageView);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder));
  }, [dispatch]);

  const onChangeSearch = useCallback((searchValue: string) => {
    dispatch(articlesPageActions.setSearch(searchValue));
  }, [dispatch]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort));
  }, [dispatch]);

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
  }, [dispatch]);

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
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
          value={search}
        />
      </Card>
    </div>
  );
});

ArticlesPageFilters.displayName = 'ArticlesPageFilters';
