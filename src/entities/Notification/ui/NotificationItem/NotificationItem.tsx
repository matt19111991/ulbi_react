import { memo } from 'react';
import { Link } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import { Notification } from '../../model/types/notification';

import classes from './NotificationItem.module.scss';

interface NotificationItemProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Уведомление
   */
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
    const additionalClasses = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => classes.redesigned,
      off: () => classes.deprecated,
    });

    /*
      для повышения безопасности, предотвращения фишинговых атак, неконтролируемых редиректов и пр.,
      при использовании "target='_blank'" рекомендуются использовать "rel='noopener noreferrer'"

     'noopener' не дает новой вкладке доступ к 'window.opener' (родительскому окну),
     'noreferrer' не отправляет информацию о реферере

      Статья: https://sky.pro/media/bezopasnost-ssylok-s-target_blank-i-relnoopener-noreferrer
    */
    return (
      <Link
        className={classNames(classes.link, {}, [additionalClasses])}
        rel='noopener noreferrer'
        target='_blank'
        to={notification.href}
      >
        {content}
      </Link>
    );
  }

  return content;
});

NotificationItem.displayName = 'NotificationItem';
