import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OfflineLogo from '@/shared/assets/icons/offline.svg';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag, ToggleFeatures } from '@/shared/lib/features';

import classes from './Offline.module.scss';

interface OfflineProps {
  /**
   * Содержимое офлайн компонента
   */
  children: ReactNode;
}

export const Offline = ({ children }: OfflineProps) => {
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const { t } = useTranslation();

  const [online, setOnline] = useState(navigator.onLine);

  const onSetOnlineHandler = useCallback(() => {
    setOnline(true);
  }, [setOnline]);

  const onSetOfflineHandler = useCallback(() => {
    setOnline(false);
  }, [setOnline]);

  useEffect(() => {
    window.addEventListener('online', onSetOnlineHandler);
    window.addEventListener('offline', onSetOfflineHandler);

    return () => {
      window.removeEventListener('online', onSetOnlineHandler);
      window.removeEventListener('offline', onSetOfflineHandler);
    };
  }, [onSetOfflineHandler, onSetOnlineHandler]);

  return (
    <>
      <div className={classNames(classes.Offline, { [classes.hide]: online })}>
        <HStack
          className={classNames(classes.content, {
            [classes.contentDeprecated]: !isAppRedesigned,
            [classes.contentRedesigned]: isAppRedesigned,
          })}
        >
          <OfflineLogo />

          <VStack className={classes.text}>
            <ToggleFeatures
              feature='isAppRedesigned'
              on={<TextRedesigned text={t('Вы не в онлайн')} />}
              off={<TextDeprecated text={t('Вы не в онлайн')} />}
            />

            <ToggleFeatures
              feature='isAppRedesigned'
              on={<TextRedesigned text={t('Проверьте соединение с интернетом')} />}
              off={<TextDeprecated text={t('Проверьте соединение с интернетом')} />}
            />
          </VStack>
        </HStack>
      </div>

      <div className={classNames(classes.overlay, { [classes.visible]: !online })} />

      {children}
    </>
  );
};
