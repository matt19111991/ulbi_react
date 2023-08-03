import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page';

import { getArticlesPageError } from '../../model/selectors/articlesPageSelectors';

import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const error = useSelector(getArticlesPageError);

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') { // иначе в 'storybook' одновременно улетает множество запросов
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

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

        <ArticleInfiniteList className={classes.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
