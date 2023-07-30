import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { Page } from 'widgets/Page';

import { getArticleCommentsAreLoading } from '../../model/selectors/comments/comments';

import {
  getArticleRecommendationsAreLoading,
} from '../../model/selectors/recommendations/recommendations';

import {
  addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';

import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

import {
  getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice';

import {
  getArticleRecommendations,
  // eslint-disable-next-line max-len
} from '../../model/slices/articleDetailsPageRecommendationsSlice/articleDetailsPageRecommendationsSlice';

import { articleDetailsPageReducer } from '../../model/slices';

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');
/*
  селектор 'getArticleComments' из 'createEntityAdapter' предоставляет свои методы
  для получения стейта; можно не писать селекторы вручную для 'ids' или 'entities',
  но для кастомных полей 'isLoading' и 'error' нужны отдельные селекторы
*/const comments = useSelector(getArticleComments.selectAll);
  const commentsAreLoading = useSelector(getArticleCommentsAreLoading);

  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsAreLoading = useSelector(getArticleRecommendationsAreLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));

    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (__PROJECT__ !== 'storybook' && !id) {
    return (
      <div className={classNames(classes.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
        <VStack gap='16' max>
          <ArticleDetailsPageHeader />

          <ArticleDetails id={id!} />

          <Text
            className={classes.recommendationTitle}
            size={TextSize.L}
            title={t('Рекомендуем')}
          />

          <ArticleList
            articles={recommendations}
            className={classes.recommendations}
            isLoading={recommendationsAreLoading}
            target='_blank'
            virtualized={false}
          />

          <Text
            className={classes.commentTitle}
            size={TextSize.L}
            title={t('Комментарии')}
          />

          <AddCommentForm onSendComment={onSendComment} />

          <CommentList comments={comments} isLoading={commentsAreLoading} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
