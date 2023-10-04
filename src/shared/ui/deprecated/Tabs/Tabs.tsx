import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem } from '@/shared/types/ui';

import { Card, CardTheme } from '../Card/Card';

import classes from './Tabs.module.scss';

interface TabsProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * ID для тестов
   */
  'data-testid'?: string;

  /**
   * Обработчик клика по вкладке
   */
  onTabClick: (tab: TabItem) => void;

  /**
   * Вкладки
   */
  tabs: TabItem[];

  /**
   * Выбранная вкладка
   */
  value: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Tabs = memo(
  ({ className, 'data-testid': dataTestId = 'Tab', onTabClick, tabs, value }: TabsProps) => {
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
            data-testid={`${dataTestId}.${tab.value}`}
            key={tab.value}
            onClick={onClickHandler(tab)}
            theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
