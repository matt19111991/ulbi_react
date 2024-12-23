import { memo, useCallback, useMemo, useState } from 'react';

import type { TabItem } from '@/shared/types/ui';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

import { AsyncAutoBatching } from './components/AsyncAutoBatching/AsyncAutoBatching';
import { UseDeferredValue } from './components/UseDeferredValue/UseDeferredValue';
import { UseId } from './components/UseId/UseId';
import { UseInsertionEffect } from './components/UseInsertionEffect/UseInsertionEffect';
import { UseSyncExternalStore } from './components/UseSyncExternalStore/UseSyncExternalStore';
import { UseTransition } from './components/UseTransition/UseTransition';

import classes from './Version18.module.scss';

const tabs: TabItem[] = [
  { content: 'useId', value: 'useId' },
  { content: 'useTransition', value: 'useTransition' },
  { content: 'useDeferredValue', value: 'useDeferredValue' },
  { content: 'useSyncExternalStore', value: 'useSyncExternalStore' },
  { content: 'useInsertionEffect ', value: 'useInsertionEffect' },
  { content: 'asyncAutoBatching', value: 'asyncAutoBatching' },
];

export const Version18 = memo(() => {
  const [activeTab, setActiveTab] = useState<TabItem>(tabs[1]);

  const onTabClick = useCallback((tab: TabItem) => {
    setActiveTab(tab);
  }, []);

  const tabContent = useMemo(() => {
    switch (activeTab.value) {
      case 'asyncAutoBatching':
        return <AsyncAutoBatching />;
      case 'useDeferredValue':
        return <UseDeferredValue />;
      case 'useInsertionEffect':
        return <UseInsertionEffect />;
      case 'useId':
        return <UseId />;
      case 'useSyncExternalStore':
        return <UseSyncExternalStore />;
      case 'useTransition':
        return <UseTransition />;
      default:
        return null;
    }
  }, [activeTab.value]);

  return (
    <VStack align='start' className={classes.Version18} gap='24'>
      <Tabs className={classes.tabs} onTabClick={onTabClick} tabs={tabs} value={activeTab.value} />

      {tabContent}
    </VStack>
  );
});

Version18.displayName = 'Version18';
