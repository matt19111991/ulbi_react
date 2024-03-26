import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';

import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon as RedesignedIcon } from '@/shared/ui/redesigned/Icon';

import type { SidebarItemType } from '../../model/types/sidebar';

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

          <span className={classes.link}>
            {/*
              без контекста будет предупреждение: "babel-plugin-i18next-extract: Extraction error in
              /home/dmitry/WebstormProjects/ulbi_react/src/widgets/Sidebar/ui/SidebarItem/SidebarItem.tsx
              at line 68. Couldn't evaluate i18next key. You should either make the key evaluable or skip
              the line using a skip comment" при запуске 'unit' тестов

              при использовании контекста, значения будут подставляться из переводов по ключам вида
             `Меню_${text}` ==> 'Меню_Главная', 'Меню_Профиль' и т.д.
            */}
            {t('Меню', { context: text })}
          </span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          className={classNames(classes.item, { [classes.collapsed]: collapsed })}
          theme={AppLinkTheme.SECONDARY}
          to={path}
        >
          <Icon />

          <span className={classes.link}>
            {/*
              без контекста будет предупреждение: "babel-plugin-i18next-extract: Extraction error in
              /home/dmitry/WebstormProjects/ulbi_react/src/widgets/Sidebar/ui/SidebarItem/SidebarItem.tsx
              at line 68. Couldn't evaluate i18next key. You should either make the key evaluable or skip
              the line using a skip comment" при запуске 'unit' тестов

              при использовании контекста, значения будут подставляться из переводов по ключам вида
             `Меню_${text}` ==> 'Меню_Главная', 'Меню_Профиль' и т.д.
            */}
            {t('Меню', { context: text })}
          </span>
        </AppLinkDeprecated>
      }
    />
  );
});

SidebarItem.displayName = 'SidebarItem';
