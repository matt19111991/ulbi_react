import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { useGetNotificationsQuery } from '../../api/notificationApi';

import { NotificationItem } from '../NotificationItem/NotificationItem';

import classes from './NotificationList.module.scss';

interface NotificationListProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Пробрасываемая ошибка из 'storybook'
   */
  storybookError?: string;

  /**
   * Пробрасываемое состояние загрузки из 'storybook'
   */
  storybookLoading?: boolean;
}

export const NotificationList = memo(
  ({ className, storybookError, storybookLoading }: NotificationListProps) => {
    const { t } = useTranslation();

    const {
      data: notifications = [],
      error: queryError,
      isLoading: queryLoading,
      // нужно передать 'undefined' первым аргументом, иначе не получиться прокинуть второй аргумент с опциями
    } = useGetNotificationsQuery(
      undefined,
      { pollingInterval: 5000 }, // запрос автоматически отправляется через заданный интервал в 5с
    );

    const isLoading = __PROJECT__ === 'storybook' ? storybookLoading : queryLoading;
    const error = __PROJECT__ === 'storybook' ? storybookError : queryError;

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (isLoading) {
      return (
        <VStack className={classNames('', {}, [className])} gap='16' max>
          <Skeleton border='8px' height='80px' width='100%' />
          <Skeleton border='8px' height='80px' width='100%' />
          <Skeleton border='8px' height='80px' width='100%' />
        </VStack>
      );
    }

    if (error) {
      return (
        <HStack className={classNames(classes.error, {}, [className])}>
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<TextRedesigned text={t('Ошибка при загрузке уведомлений')} variant='error' />}
            off={
              <TextDeprecated theme={TextTheme.ERROR} text={t('Ошибка при загрузке уведомлений')} />
            }
          />
        </HStack>
      );
    }

    return (
      <VStack className={classNames('', {}, [className])} gap='16' max>
        {notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </VStack>
    );
  },
);

NotificationList.displayName = 'NotificationList';
