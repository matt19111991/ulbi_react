import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { AppLink as AppLinkRedesigned } from '@/shared/ui/redesigned/AppLink';
import { Avatar as AvatarRedesigned } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Comment } from '../../model/types/comment';

import classes from './CommentCard.module.scss';

interface CommentCardProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Данные комментария
   */
  comment?: Comment;

  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card border='partial' max padding='24'>
            <VStack
              align='start'
              className={classNames('', {}, [className])}
              data-testid='CommentCard.Content'
              gap='8'
              max
            >
              <AppLinkRedesigned to={getRouteProfile(comment.user.id)}>
                <HStack gap='8'>
                  {comment.user.avatar ? (
                    <AvatarRedesigned
                      className={classes.avatar}
                      size={30}
                      src={comment.user.avatar}
                    />
                  ) : null}

                  <TextRedesigned bold text={comment.user.username} />
                </HStack>
              </AppLinkRedesigned>

              <TextRedesigned text={comment.text} />
            </VStack>
          </Card>
        }
        off={
          <VStack
            align='start'
            className={classNames(classes.CommentCard, {}, [className])}
            data-testid='CommentCard.Content'
            gap='8'
            max
          >
            <AppLinkDeprecated className={classes.header} to={getRouteProfile(comment.user.id)}>
              {comment.user.avatar ? (
                <AvatarDeprecated className={classes.avatar} size={30} src={comment.user.avatar} />
              ) : null}

              <TextDeprecated title={comment.user.username} />
            </AppLinkDeprecated>

            <TextDeprecated text={comment.text} />
          </VStack>
        }
      />
    );
  }

  return null;
});

CommentCard.displayName = 'CommentCard';
