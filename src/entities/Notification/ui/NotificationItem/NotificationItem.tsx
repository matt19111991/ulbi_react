import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { Notification } from '../../model/types/notification';

import classes from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
  const content = (
    <Card
      className={classNames(classes.NotificationItem, {}, [className])}
      theme={CardTheme.OUTLINED}
    >
      <Text text={notification.description} title={notification.title} />
    </Card>
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
