import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { TabItem } from '@/shared/types/ui';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

import { Page } from '@/widgets/Page';

import { Version18 } from '../lib/components/Version18/Version18';
import { Version19 } from '../lib/components/Version19/Version19';

import classes from './VersionsPage.module.scss';

const tabs: TabItem[] = [
  { content: '18', value: '18' },
  { content: '19', value: '19' },
];

export const VersionsPage = memo(() => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<TabItem>(tabs[0]);

  const onTabClick = useCallback((tab: TabItem) => {
    setActiveTab(tab);
  }, []);

  return (
    <Page className={classes.VersionsPage} data-testid='VersionsPage'>
      <VStack align='start' gap='8'>
        {t('Страница c нововведениями в React')}

        <Tabs
          className={classes.tabs}
          direction='row'
          onTabClick={onTabClick}
          tabs={tabs}
          value={activeTab.value}
        />

        {activeTab.value === '18' ? <Version18 /> : <Version19 />}
      </VStack>
    </Page>
  );
});

VersionsPage.displayName = 'VersionsPage';
