import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Comment } from '../../model/types/comment';

import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Список комментариев
   */
  comments?: Comment[];

  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack align='start' className={classNames('', {}, [className])} gap='16' max>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack align='start' className={classNames('', {}, [className])} gap='16' max>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} isLoading={isLoading} />
        ))
      ) : (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<TextRedesigned text={t('Комментарии отсутствуют')} />}
          off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
        />
      )}
    </VStack>
  );
});

CommentList.displayName = 'CommentList';
