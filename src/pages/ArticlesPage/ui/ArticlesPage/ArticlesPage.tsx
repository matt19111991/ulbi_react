import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import {
  getArticlesPageAreLoading,
  getArticlesPageError,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

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
  const { t } = useTranslation();

  const articles = useSelector(getArticles.selectAll);
  const error = useSelector(getArticlesPageError);
  const isLoading = useSelector(getArticlesPageAreLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
    dispatch(articlesPageActions.initState());

    dispatch(fetchArticlesList({ page: 1 }));
  });

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') { // иначе в 'storybook' одновременно улетает множество запросов
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch]);

  const onChangeView = useCallback((newView: ArticleView) => {
    dispatch(articlesPageActions.setView(newView));
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
