import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CommentList } from '@/entities/Comment';

import { AddCommentForm } from '@/features/AddCommentForm';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { getArticleCommentsAreLoading } from '../../../model/selectors/comments/comments';

import { addCommentForArticle } from '../../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { getArticleComments } from '../../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' статьи
   */
  id?: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article-details');

  /*
    селектор 'getArticleComments' из 'createEntityAdapter' предоставляет свои методы
    для получения стейта, можно не писать селекторы вручную для 'ids' или 'entities',
    но для кастомных полей 'isLoading' и 'error' нужны отдельные селекторы
  */

  const comments = useSelector(getArticleComments.selectAll);
  const commentsAreLoading = useSelector(getArticleCommentsAreLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  return (
    <VStack align='start' className={classNames('', {}, [className])} gap='16' max>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<TextRedesigned size='l' title={t('Комментарии')} />}
        off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
      />

      <AddCommentForm isLoading={commentsAreLoading} onSendComment={onSendComment} />

      <CommentList comments={comments} isLoading={commentsAreLoading} />
    </VStack>
  );
});

ArticleDetailsComments.displayName = 'ArticleDetailsComments';
