import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { VStack } from '@/shared/ui/Stack';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';

import { SidebarItem } from '../SidebarItem/SidebarItem';

import classes from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const sidebarItemsList = useSelector(getSidebarItems);

  const [collapsed, setCollapsed] = useState(false);

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem collapsed={collapsed} key={item.path} item={item} />
  )), [collapsed, sidebarItemsList]);

  const onToggle = () => {
      setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={classNames(
        classes.Sidebar,
        { [classes.collapsed]: collapsed },
        [className],
      )}
      data-testid='sidebar'
    >
      <Button
        className={classes.collapseBtn}
        data-testid='sidebar-toggle'
        onClick={onToggle}
        size={ButtonSize.L}
        square
        theme={ButtonTheme.BACKGROUND_INVERTED}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <VStack
        align='start'
        className={classes.items}
        gap='8'
        role='navigation' // для семантики
      >
        {itemsList}
      </VStack>

      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
