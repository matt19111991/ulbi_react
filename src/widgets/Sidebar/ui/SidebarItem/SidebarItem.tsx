import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { SidebarItemType } from '../../model/items';

import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
  collapsed: boolean;
  item: SidebarItemType;
}

export const SidebarItem = memo(({ collapsed, item }: SidebarItemProps) => {
  const { t } = useTranslation();

  const { Icon, path, text } = item;

  return (
    <AppLink
      className={classNames(classes.item, { [classes.collapsed]: collapsed })}
      invertedTheme={AppLinkTheme.SECONDARY}
      to={path}
    >
      <Icon className={classes.icon} />
      <span className={classes.link}>{t(text)}</span>
    </AppLink>
  );
});

SidebarItem.displayName = 'SidebarItem';
