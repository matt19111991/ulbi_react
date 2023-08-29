import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { Comment } from '../../model/types/comment';

import classes from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <VStack
        align='start'
        className={classNames(classes.CommentCard, {}, [className, classes.loading])}
        data-testid='CommentCard.Loading'
        gap='8'
        max
      >
        <div className={classes.header}>
          <Skeleton border='50%' className={classes.avatar} height={30} width={30} />
          <Skeleton height={16} width={100} />
        </div>

        <Skeleton className={classes.text} height={50} width='100%' />
      </VStack>
    );
  }

  if (comment) {
    return (
      <VStack
        align='start'
        className={classNames(classes.CommentCard, {}, [className])}
        data-testid='CommentCard.Content'
        gap='8'
        max
      >
        <AppLink className={classes.header} to={getRouteProfile(comment.user.id)}>
          {comment.user.avatar ? (
            <Avatar className={classes.avatar} size={30} src={comment.user.avatar} />
          ) : null}

          <Text title={comment.user.username} />
        </AppLink>

        <Text text={comment.text} />
      </VStack>
    );
  }

  return null;
});

CommentCard.displayName = 'CommentCard';
