import { useCallback, useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { TabItem } from '@/shared/types/ui';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { Text } from '@/shared/ui/redesigned/Text';

import { SlowList } from '../SlowList/SlowList';

import classes from './UseTransition.module.scss';

export const UseTransition = () => {
  const [pending, startTransition] = useTransition();

  const { t } = useTranslation();
  const { t: tAbout } = useTranslation('about');

  const tabs: TabItem[] = useMemo(
    () => [
      { content: tAbout('О сайте'), value: 'about' },
      {
        content: (
          <>
            <span>{t('Посты')}</span>

            <span className={classes.loader} />
          </>
        ),
        value: 'posts',
      },
      { content: t('Контакты'), value: 'contacts' },
    ],
    [t, tAbout],
  );

  const [hasTransitionTab, setHasTransitionTab] = useState<TabItem>(tabs[0]);
  const [noTransitionTab, setNoTransitionTab] = useState<TabItem>(tabs[0]);

  const getTabContent = (tab: TabItem['value']) => {
    switch (tab) {
      case 'about':
        return <p>{tAbout('О сайте')}</p>;
      case 'posts':
        return <SlowList countable />;
      case 'contacts':
        return <p>+123456789</p>;
      default:
        return null;
    }
  };

  const onTabClickWithTransition = useCallback((tab: TabItem) => {
    startTransition(() => {
      setHasTransitionTab(tab);
    });
  }, []);

  const onTabClickNoTransition = useCallback((tab: TabItem) => {
    setNoTransitionTab(tab);
  }, []);

  return (
    <VStack align='start' gap='24'>
      <VStack align='start'>
        <Text size='l' text={t('С переходами')} />
        <Text size='m' text={t('Переключение таб без задержек')} />

        <VStack align='start' gap='24'>
          <Tabs
            className={classNames(classes.tabs, { [classes.pending]: pending })}
            onTabClick={onTabClickWithTransition}
            tabs={tabs}
            value={hasTransitionTab.value}
          />

          {getTabContent(hasTransitionTab.value)}
        </VStack>
      </VStack>

      <VStack className={classes.separator} max>
        <hr />
      </VStack>

      <VStack align='start'>
        <Text size='l' text={t('Без переходов')} />
        <Text size='m' text={t('Переключение таб с задержкой')} />

        <VStack align='start' gap='24'>
          <Tabs
            className={classes.tabs}
            onTabClick={onTabClickNoTransition}
            tabs={tabs}
            value={noTransitionTab.value}
          />

          {getTabContent(noTransitionTab.value)}
        </VStack>
      </VStack>
    </VStack>
  );
};
