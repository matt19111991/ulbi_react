import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

import { classNames } from '@/shared/lib/classNames/classNames';

import { DynamicModuleLoaderV2 } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { ToggleFeatures } from '@/shared/lib/features';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { Text as TextDeprecated, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Page } from '@/widgets/Page';

import { ArticlesPageFilters } from '../../lib/components/deprecated/ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../../lib/components/redesigned/ArticleInfiniteList/ArticleInfiniteList';
import { FiltersContainer } from '../../lib/components/redesigned/FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../../lib/components/redesigned/ViewSelectorContainer/ViewSelectorContainer';

import {
  getArticlesPageAreLoading,
  getArticlesPageError,
} from '../../model/selectors/articlesPageSelectors';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation();

  const error = useSelector(getArticlesPageError);
  const loading = useSelector(getArticlesPageAreLoading);

  const onLoadNextPart = useCallback(() => {
    // в 'storybook' не используем ленивую подгрузку данных
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch]);

  useInitialEffect(() => {
    /*
      отправляем начальный запрос с корректно выставленными параметрами ('limit', 'page', ...) и
      устанавливаем первоначальный вид для статей, взятый из 'localStorage'
    */
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return (
      <Page className={classNames(classes.ArticlesPage, {}, [className])}>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <TextRedesigned
              align='center'
              title={t('Ошибка при загрузке статей')}
              variant='error'
            />
          }
          off={
            <TextDeprecated
              align={TextAlign.CENTER}
              theme={TextTheme.ERROR}
              title={t('Ошибка при загрузке статей')}
            />
          }
        />
      </Page>
    );
  }

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <StickyContentLayout
          content={
            <Page
              className={classNames(classes.ArticlesPage, {}, [className])}
              data-testid='ArticlesPage'
              loading={loading}
              onScrollEnd={onLoadNextPart}
              storableScroll
            >
              <ArticleInfiniteList />

              <ArticlePageGreeting />
            </Page>
          }
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
        />
      }
      off={
        <Page
          className={classNames(classes.ArticlesPage, {}, [className])}
          data-testid='ArticlesPage'
          loading={loading}
          onScrollEnd={onLoadNextPart}
          storableScroll
        >
          <ArticlesPageFilters />

          <ArticleInfiniteList className={classes.list} />

          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoaderV2 reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoaderV2>
  );
};

export default memo(ArticlesPage);
