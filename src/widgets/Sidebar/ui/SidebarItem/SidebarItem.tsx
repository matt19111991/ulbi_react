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
  /**
   * Свернутое / развернутое состояние
   */
  collapsed: boolean;

  /**
   * Элемент бокового меню
   */
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
          activeClassName={classes.active}
          className={classNames(classes.itemRedesigned, {
            [classes.collapsedRedesigned]: collapsed,
          })}
          to={path}
        >
          <RedesignedIcon Svg={Icon} />

          {/*
            Без контекста будет предупреждение: "babel-plugin-i18next-extract: Extraction error in
            /home/dmitry/WebstormProjects/ulbi_react/src/widgets/Sidebar/ui/SidebarItem/SidebarItem.tsx
            at line 68. Couldn't evaluate i18next key. You should either make the key evaluable or skip
            the line using a skip comment"
         */}
          <span className={classes.link}>{t('Меню', { context: text.toString() })}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          className={classNames(classes.item, { [classes.collapsed]: collapsed })}
          theme={AppLinkTheme.SECONDARY}
          to={path}
        >
          <Icon className={classes.icon} />
          <span className={classes.link}>{t('Меню', { context: text.toString() })}</span>
        </AppLinkDeprecated>
      }
    />
  );
});

SidebarItem.displayName = 'SidebarItem';
