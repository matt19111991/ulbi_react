import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleView } from 'entities/Article';

import { ArticleViewSelector } from 'features/ArticleViewSelector';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Page } from 'shared/ui/Page/Page';

import {
  getArticlesPageAreLoading,
  getArticlesPageHasMore,
  getArticlesPageNumber,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { fetchArticlesList } from '../../model/services/fetchArticlesList';

import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slice/articlesPageSlice';

import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticles.selectAll);
  const hasMore = useSelector(getArticlesPageHasMore);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const page = useSelector(getArticlesPageNumber);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
    dispatch(articlesPageActions.initState());

    dispatch(fetchArticlesList({ page: 1 }));
  });

  const onLoadNextPart = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;

      dispatch(articlesPageActions.setPage(nextPage));

      dispatch(fetchArticlesList({ page: nextPage }));
    }
  }, [dispatch, hasMore, isLoading, page]);

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        className={classNames(classes.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
      >
        <ArticleViewSelector onViewClick={onChangeView} selectedView={view} />

        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
