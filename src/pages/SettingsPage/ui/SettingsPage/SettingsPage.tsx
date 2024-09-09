import { memo, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import {
  useLazyGetSubscriptionListQuery,
  useRemoveSubscriptionMutation,
} from '@/features/SubscriptionList';

import { UIDesignSwitcher } from '@/features/UIDesignSwitcher';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { Page } from '@/widgets/Page';

import classes from './SettingsPage.module.scss';

interface SettingsPageProps {
  /**
   * Внешний класс
   */
  className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
  const [getSubscriptionListQuery, { data: subscriptions = [] }] =
    useLazyGetSubscriptionListQuery(undefined);

  const [removeSubscriptionMutation] = useRemoveSubscriptionMutation();

  const { t } = useTranslation();

  const user = useSelector(getUserAuthData);

  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

  const userAgent = navigator.userAgent;

  const isSubscribed = useMemo<boolean>(
    () =>
      Boolean(
        subscriptions.find(
          (subscription) => subscription.token === token && subscription.userAgent === userAgent,
        ),
      ),
    [subscriptions, token, userAgent],
  );

  const onUpdateSubscription = useCallback(async () => {
    if (isSubscribed) {
      try {
        await removeSubscriptionMutation({ token, userAgent });

        await getSubscriptionListQuery(undefined);
      } catch (e) {
        console.log(`Unsubscribe error: ${(e as Error).message}`);
      }
    } else {
      window.location.reload();
    }
  }, [getSubscriptionListQuery, isSubscribed, removeSubscriptionMutation, token, userAgent]);

  useEffect(() => {
    if (token) {
      getSubscriptionListQuery(undefined);
    }
  }, [getSubscriptionListQuery, token]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Page
          className={classNames(classes.SettingsPage, { [classes.authorized]: Boolean(user) }, [
            className,
          ])}
        >
          <VStack align='start' className={classes.content} gap='24'>
            <TextRedesigned title={t('Настройки пользователя')} />

            <UIDesignSwitcher />

            <HStack className={classes.subscription} gap='16'>
              <TextRedesigned
                className={classes.subscriptionTitle}
                size='s'
                title={t(`Подписка на уведомления ${isSubscribed ? 'активна' : 'неактивна'}`)}
              />

              <ButtonRedesigned color='normal' onClick={onUpdateSubscription} variant='filled'>
                {isSubscribed ? t('Отписаться') : t('Подписаться')}
              </ButtonRedesigned>
            </HStack>
          </VStack>
        </Page>
      }
      off={
        <Page
          className={classNames(classes.SettingsPage, { [classes.authorized]: Boolean(user) }, [
            className,
            classes.deprecated,
          ])}
        >
          <VStack align='start' gap='24'>
            <TextDeprecated title={t('Настройки пользователя')} />

            <UIDesignSwitcher />

            <HStack className={classes.subscription} gap='16'>
              <TextDeprecated
                className={classes.subscriptionTitle}
                title={t(`Подписка на уведомления ${isSubscribed ? 'активна' : 'неактивна'}`)}
              />

              <ButtonDeprecated
                className={classes.deprecatedBtn}
                onClick={onUpdateSubscription}
                theme={ButtonTheme.OUTLINE}
              >
                {isSubscribed ? t('Отписаться') : t('Подписаться')}
              </ButtonDeprecated>
            </HStack>
          </VStack>
        </Page>
      }
    />
  );
};

export default memo(SettingsPage);
