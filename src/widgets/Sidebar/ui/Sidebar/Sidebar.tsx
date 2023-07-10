import { memo, useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';

import { SidebarItemsList } from '../../model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import classes from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
      setCollapsed((prev) => !prev);
  };

  return (
    <div
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

      <div className={classes.items}>
        {SidebarItemsList.map((item) => (
          <SidebarItem collapsed={collapsed} key={item.path} item={item} />
        ))}
      </div>

      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
