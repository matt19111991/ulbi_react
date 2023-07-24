import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page';

import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

import {
  getArticlesPageAreLoading,
  getArticlesPageError,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';

import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const articles = useSelector(getArticles.selectAll);
  const error = useSelector(getArticlesPageError);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') { // иначе в 'storybook' одновременно улетает множество запросов
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch]);

  if (error) {
    return (
      <Page className={classNames(classes.ArticlesPage, {}, [className])}>
        <Text
          align={TextAlign.CENTER}
          theme={TextTheme.ERROR}
          title={t('Ошибка при загрузке статей')}
        />
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(classes.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
      >
        <ArticlesPageFilters />

        <ArticleList
          articles={articles}
          className={classes.list}
          isLoading={isLoading}
          view={view}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
