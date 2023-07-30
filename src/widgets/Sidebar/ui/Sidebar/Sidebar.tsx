import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { VStack } from 'shared/ui/Stack';

import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

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
    <menu
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

      <VStack className={classes.items} gap='8'>
        {itemsList}
      </VStack>

      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </menu>
  );
});

Sidebar.displayName = 'Sidebar';
