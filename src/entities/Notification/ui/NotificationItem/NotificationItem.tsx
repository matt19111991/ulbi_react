import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import { Notification } from '../../model/types/notification';

import classes from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card className={classNames(classes.NotificationItem, {}, [className])}>
          <Text text={notification.description} title={notification.title} />
        </Card>
      }
      off={
        <CardDeprecated
          className={classNames(classes.NotificationItem, {}, [className])}
          theme={CardTheme.OUTLINED}
        >
          <TextDeprecated text={notification.description} title={notification.title} />
        </CardDeprecated>
      }
    />
  );

  if (notification.href) {
    return (
      <a className={classes.link} href={notification.href} rel='noreferrer' target='_blank'>
        {content}
      </a>
    );
  }

  return content;
});

NotificationItem.displayName = 'NotificationItem';
