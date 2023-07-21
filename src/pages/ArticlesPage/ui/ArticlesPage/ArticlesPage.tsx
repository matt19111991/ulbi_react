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

import {
  getArticlesPageAreLoading,
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
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState());

    dispatch(fetchArticlesList());
  });

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(classes.ArticlesPage, {}, [className])}>
        <ArticleViewSelector onViewClick={onChangeView} selectedView={view} />

        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
