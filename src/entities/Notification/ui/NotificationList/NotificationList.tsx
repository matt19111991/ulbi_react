import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';

import { useGetNotificationsQuery } from '../../api/notificationApi';

import { NotificationItem } from '../NotificationItem/NotificationItem';

import classes from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
  storybookError?: string;
  storybookLoading?: boolean;
}

export const NotificationList = memo(({
  className,
  storybookError,
  storybookLoading,
}: NotificationListProps) => {
  const { t } = useTranslation();

  const {
    data: notifications = [],
    error: queryError,
    isLoading: queryLoading,
  } = useGetNotificationsQuery({}, { pollingInterval: 5000 });

  const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;
  const error = __PROJECT__ === 'storybook' ? storybookError : queryError;

  if (isLoading) {
    return (
      <VStack
        className={classNames('', {}, [className])}
        gap='16'
        max
      >
        <Skeleton border='8px' height='80px' width='100%' />
        <Skeleton border='8px' height='80px' width='100%' />
        <Skeleton border='8px' height='80px' width='100%' />
      </VStack>
    );
  }

  if (error) {
    return (
      <HStack
        className={classNames(classes.error, {}, [className])}
      >
        <Text
          theme={TextTheme.ERROR}
          text={t('Ошибка при загрузке уведомлений')}
        />
      </HStack>
    );
  }

  return (
    <VStack
      className={classNames('', {}, [className])}
      gap='16'
      max
    >
      {notifications?.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </VStack>
  );
});

NotificationList.displayName = 'NotificationList';
