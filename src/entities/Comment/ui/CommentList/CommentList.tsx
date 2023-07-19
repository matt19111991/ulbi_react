import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';

import { CommentCard } from '../CommentCard/CommentCard';

import classes from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className])}>
        <CommentCard className={classes.comment} isLoading />
        <CommentCard className={classes.comment} isLoading />
        <CommentCard className={classes.comment} isLoading />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            className={classes.comment}
            comment={comment}
            key={comment.id}
            isLoading={isLoading}
          />
        ))
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  );
});

CommentList.displayName = 'CommentList';
