import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem } from '@/shared/types/ui';

import { Card, CardTheme } from '../Card/Card';

import classes from './Tabs.module.scss';

interface TabsProps {
  className?: string;
  onTabClick: (tab: TabItem) => void;
  tabs: TabItem[];
  value: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Tabs = memo(({ className, onTabClick, tabs, value }: TabsProps) => {
  const onClickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(classes.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={classes.tab}
          key={tab.value}
          onClick={onClickHandler(tab)}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});

Tabs.displayName = 'Tabs';
