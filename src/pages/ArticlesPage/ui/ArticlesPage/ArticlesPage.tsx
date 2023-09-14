import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

import { Page } from '@/widgets/Page';

import { getArticlesPageError } from '../../model/selectors/articlesPageSelectors';

import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

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
    // иначе в 'storybook' одновременно улетает множество запросов
    if (__PROJECT__ !== 'storybook') {
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

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <StickyContentLayout
          content={
            <Page
              className={classNames(classes.ArticlesPage, {}, [className])}
              data-testid='ArticlesPage'
              onScrollEnd={onLoadNextPart}
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
          onScrollEnd={onLoadNextPart}
        >
          <ArticlesPageFilters />

          <ArticleInfiniteList className={classes.list} />

          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
