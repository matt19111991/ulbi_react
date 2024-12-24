import { memo, useCallback, useMemo, useState } from 'react';

import type { TabItem } from '@/shared/types/ui';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

import { Action } from './components/Action/Action';
import { Context } from './components/Context/Context';
import { MetaData } from './components/MetaData/MetaData';
import { NoForwardRef } from './components/NoForwardRef/NoForwardRef';
import { Preloading } from './components/Preloading/Preloading';
import { RefCleanUp } from './components/RefCleanUp/RefCleanUp';
import { Use } from './components/Use/Use';
import { UseActionState } from './components/UseActionState/UseActionState';
import { UseOptimistic } from './components/UseOptimistic/UseOptimistic';

import classes from './Version19.module.scss';

const tabs: TabItem[] = [
  { content: "Атрибут 'action'", value: 'action' },
  { content: 'useActionState', value: 'useActionState' },
  { content: 'useFormStatus', value: 'useFormStatus' },
  { content: 'useOptimistic', value: 'useOptimistic' },
  { content: 'use', value: 'use' },
  { content: 'noForwardRef', value: 'noForwardRef' },
  { content: 'context', value: 'context' },
  { content: 'ref cleanup', value: 'ref cleanup' },
  { content: 'metadata', value: 'metadata' },
  { content: 'preloading', value: 'preloading' },
];

export const Version19 = memo(() => {
  const [activeTab, setActiveTab] = useState<TabItem>(tabs[1]);

  const onTabClick = useCallback((tab: TabItem) => {
    setActiveTab(tab);
  }, []);

  const tabContent = useMemo(() => {
    switch (activeTab.value) {
      case 'action':
        return <Action />;
      case 'useActionState':
        return <UseActionState />;
      case 'useFormStatus':
        return <UseActionState />;
      case 'useOptimistic':
        return <UseOptimistic />;
      case 'use':
        return <Use />;
      case 'noForwardRef':
        return <NoForwardRef />;
      case 'context':
        return <Context />;
      case 'ref cleanup':
        return <RefCleanUp />;
      case 'metadata':
        return <MetaData />;
      case 'preloading':
        return <Preloading />;
      default:
        return null;
    }
  }, [activeTab.value]);

  return (
    <VStack align='start' className={classes.Version19} gap='24'>
      <Tabs className={classes.tabs} onTabClick={onTabClick} tabs={tabs} value={activeTab.value} />

      {tabContent}
    </VStack>
  );
});

Version19.displayName = 'Version19';
