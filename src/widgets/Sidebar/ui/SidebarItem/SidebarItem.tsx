import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon as RedesignedIcon } from '@/shared/ui/redesigned/Icon';

import { SidebarItemType } from '../../model/types/sidebar';

import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
  collapsed: boolean;
  item: SidebarItemType;
}

export const SidebarItem = memo(({ collapsed, item }: SidebarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  // убираем возможность переходить по ссылкам с флагом 'authOnly' для неавторизованных пользователей
  if (!isAuth && item.authOnly) {
    return null;
  }

  const { Icon, path, text } = item;

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <AppLink
          className={classNames(classes.item, {
            [classes.collapsedRedesigned]: collapsed,
          })}
          to={path}
        >
          <RedesignedIcon Svg={Icon} />

          <span className={classes.link}>{t(text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          className={classNames(classes.item, { [classes.collapsed]: collapsed })}
          invertedTheme={AppLinkTheme.SECONDARY}
          to={path}
        >
          <Icon className={classes.icon} />
          <span className={classes.link}>{t(text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
});

SidebarItem.displayName = 'SidebarItem';
