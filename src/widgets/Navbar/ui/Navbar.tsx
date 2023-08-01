import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData, userActions } from 'entities/User';

import { LoginModal } from 'features/AuthByUsername';

import Logo from 'shared/assets/icons/logo.svg';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { DropDown } from 'shared/ui/DropDown/DropDown';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

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

        <DropDown
          className={classes.dropdown}
          direction='bottom-right'
          items={[
            { content: t('Выйти'), onClick: onLogout },
          ]}
          optionSize='S'
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
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
