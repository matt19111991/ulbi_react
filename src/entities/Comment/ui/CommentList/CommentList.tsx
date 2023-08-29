import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { Comment } from '../../model/types/comment';

import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
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
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
});

CommentList.displayName = 'CommentList';
