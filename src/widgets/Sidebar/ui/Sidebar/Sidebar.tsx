import { memo, useMemo, useState } from 'react';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import SidebarArrowIcon from '@/shared/assets/icons/sidebar-arrow-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { useSidebarItems } from '../../model/hooks/useSidebarItems';

import { SidebarItem } from '../SidebarItem/SidebarItem';

import classes from './Sidebar.module.scss';

interface SidebarProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const sidebarItemsList = useSidebarItems();

  const [collapsed, setCollapsed] = useState(false);

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem collapsed={collapsed} key={item.path} item={item} />
      )),
    [collapsed, sidebarItemsList],
  );

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      // сайдбар после редизайна
      on={
        <aside
          className={classNames(
            classes.SidebarRedesigned,
            { [classes.collapsedRedesigned]: collapsed },
            [className],
          )}
          data-testid='sidebar'
        >
          <AppLogo className={classes.appLogo} size={collapsed ? 30 : 80} />

          <VStack
            align='start'
            className={classes.items}
            gap='8'
            role='navigation' // для семантики
          >
            {itemsList}
          </VStack>

          <Icon
            className={classes.collapseBtn}
            clickable
            data-testid='sidebar-toggle'
            onClick={onToggle}
            Svg={SidebarArrowIcon}
          />

          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={classes.lang} short={collapsed} />
          </div>
        </aside>
      }
      // сайдбар до редизайна
      off={
        <aside
          className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])}
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
      }
    />
  );
});

Sidebar.displayName = 'Sidebar';
