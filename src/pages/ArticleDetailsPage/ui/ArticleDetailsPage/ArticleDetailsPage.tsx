import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { AddCommentForm } from 'features/AddCommentForm';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';

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
  addCommentForArticle,
} from '../../model/services/addCommentForArticle/addCommentForArticle';

import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import {
  getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice';

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

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
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

          <ArticleRecommendationsList />

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
