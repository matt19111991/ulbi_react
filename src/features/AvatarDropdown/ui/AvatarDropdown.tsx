import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';

import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { DropDown } from '@/shared/ui/Popups';

interface NotificationButtonProps {
  className?: string;
  storybookAvatar?: string;
}

export const AvatarDropdown = memo(({
  className,
  storybookAvatar,
}: NotificationButtonProps) => {
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
        href: `${RoutePath.profile}${authData?.id}`,
      },
      {
        content: t('Выйти'),
        onClick: onLogout,
      },
    ];

    if (isAdmin || isManager) {
      items.unshift({
        content: t('Панель администратора'),
        href: RoutePath.admin_panel,
      });
    }

    return items;
  }, [authData?.id, isAdmin, isManager, onLogout, t]);

  const avatarSrc = __PROJECT__ === 'storybook' ? storybookAvatar : authData?.avatar;

  return (
    <DropDown
      className={classNames('', {}, [className])}
      direction='bottom-right'
      items={menuItems}
      justify='right'
      optionSize='S'
      trigger={<Avatar size={30} src={avatarSrc} />}
    />
  );
});

AvatarDropdown.displayName = 'AvatarDropdown';
