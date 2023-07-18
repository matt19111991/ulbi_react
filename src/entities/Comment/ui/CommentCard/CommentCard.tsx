import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';

import classes from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <div className={classNames(classes.CommentCard, {}, [className])}>
        <div className={classes.header}>
          <Skeleton border='50%' className={classes.avatar} height={30} width={30} />
          <Skeleton height={16} width={100} />
        </div>

        <Skeleton className={classes.text} height={50} width='100%' />
      </div>
    );
  }

  return (
    <div className={classNames(classes.CommentCard, {}, [className])}>
      <div className={classes.header}>
        {comment.user.avatar
          ? (
            <Avatar
              className={classes.avatar}
              size={30}
              src={comment.user.avatar}
            />
          )
          : null}

        <Text title={comment.user.username} />
      </div>

      <Text className={classes.text} text={comment.text} />
    </div>
  );
});

CommentCard.displayName = 'CommentCard';
