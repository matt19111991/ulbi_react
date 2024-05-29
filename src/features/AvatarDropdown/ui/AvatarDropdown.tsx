import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';

import {
  getRouteAdmin,
  getRouteOutlet,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { DropDown as DropDownDeprecated } from '@/shared/ui/deprecated/Popups';

import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { DropDown } from '@/shared/ui/redesigned/Popups';

interface AvatarDropdownProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Аватар, пробрасываемый из 'storybook'
   */
  storybookAvatar?: string;
}

export const AvatarDropdown = memo(({ className, storybookAvatar }: AvatarDropdownProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = useCallback((): void => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const menuItems = useMemo(() => {
    const items = [
      {
        content: t('Профиль'),
        href: getRouteProfile(authData?.id || ''),
      },
      {
        content: t('Аутлет'),
        href: getRouteOutlet(),
      },
      {
        content: t('Настройки'),
        href: getRouteSettings(),
      },
      {
        content: t('Выйти'),
        onClick: onLogout,
      },
    ];

    if (isAdmin || isManager) {
      items.unshift({
        content: t('Панель администратора'),
        href: getRouteAdmin(),
      });
    }

    return items;
  }, [authData?.id, isAdmin, isManager, onLogout, t]);

  const avatarSrc = __PROJECT__ === 'storybook' ? storybookAvatar : authData?.avatar;

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <DropDown
          className={classNames('', {}, [className])}
          direction='bottom-right'
          items={menuItems}
          justify='right'
          label='avatar'
          optionSize='S'
          trigger={<Avatar size={40} src={avatarSrc} />}
        />
      }
      off={
        <DropDownDeprecated
          className={classNames('', {}, [className])}
          direction='bottom-right'
          items={menuItems}
          justify='right'
          label='avatar'
          optionSize='S'
          trigger={<AvatarDeprecated fallbackInverted size={30} src={avatarSrc} />}
        />
      }
    />
  );
});

AvatarDropdown.displayName = 'AvatarDropdown';
