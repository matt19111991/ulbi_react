import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem } from '@/shared/types/ui';

import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack';

import classes from './Tabs.module.scss';

interface TabsProps {
  className?: string;
  direction?: FlexDirection;
  onTabClick: (tab: TabItem) => void;
  tabs: TabItem[];
  value: string;
}

export const Tabs = memo(({ className, direction = 'row', onTabClick, tabs, value }: TabsProps) => {
  const onClickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      align='start'
      className={classNames(classes.Tabs, {}, [className])}
      direction={direction}
      gap='8'
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            className={classes.tab}
            border='round'
            key={tab.value}
            onClick={onClickHandler(tab)}
            variant={isSelected ? 'light' : 'normal'}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});

Tabs.displayName = 'Tabs';
