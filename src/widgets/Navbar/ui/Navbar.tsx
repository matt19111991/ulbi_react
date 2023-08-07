import {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from 'entities/User';

import { LoginModal } from 'features/AuthByUsername';

import Logo from 'shared/assets/icons/logo.svg';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { DropDown } from 'shared/ui/Popups';
import { HStack } from 'shared/ui/Stack';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
  storybookAvatar?: string;
}

export const Navbar = memo(({ className, storybookAvatar }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback((): void => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback((): void => {
    setIsAuthModal(true);
  }, []);

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

  if (authData) {
    return (
      <header className={classNames(classes.Navbar, {}, [className])}>
        <div className={classes.logoWrapper}>
          <Logo className={classes.logo} />
        </div>

        <AppLink
          className={classes.createLink}
          invertedTheme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t('Создать статью')}
        </AppLink>

        <HStack className={classes.actions} gap='16'>
          <Button theme={ButtonTheme.CLEAR}>
            <Icon inverted Svg={NotificationIcon} />
          </Button>

          <DropDown
            direction='bottom-right'
            items={menuItems}
            justify='right'
            optionSize='S'
            trigger={<Avatar size={30} src={avatarSrc} />}
          />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(classes.Navbar, {}, [className])}>
      <Button
        className={classes.links}
        onClick={onShowModal}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
