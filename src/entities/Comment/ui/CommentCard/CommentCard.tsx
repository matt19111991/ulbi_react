import { memo } from 'react';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

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
      <div
        className={
          classNames(classes.CommentCard, {}, [className, classes.loading])
        }
      >
        <div className={classes.header}>
          <Skeleton border='50%' className={classes.avatar} height={30} width={30} />
          <Skeleton height={16} width={100} />
        </div>

        <Skeleton className={classes.text} height={50} width='100%' />
      </div>
    );
  }

  if (comment) {
    return (
      <VStack
        className={
          classNames(classes.CommentCard, {}, [className])
        }
        gap='8'
        max
      >
        <AppLink
          className={classes.header}
          to={`${RoutePath.profile}${comment?.user.id}`}
        >
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
        </AppLink>

        <Text text={comment.text} />
      </VStack>
    );
  }

  return null;
});

CommentCard.displayName = 'CommentCard';
