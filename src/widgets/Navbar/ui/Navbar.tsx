import { memo, useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';

import Logo from '@/shared/assets/icons/logo.svg';

import { getRouteArticleCreate } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
  storybookAvatar?: string;
}

export const Navbar = memo(({ className, storybookAvatar }: NavbarProps) => {
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback((): void => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback((): void => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(classes.Navbar, {}, [className])}>
        <div className={classes.logoWrapper}>
          <Logo className={classes.logo} />
        </div>

        <AppLink
          className={classes.createLink}
          invertedTheme={AppLinkTheme.SECONDARY}
          to={getRouteArticleCreate()}
        >
          {t('Создать статью')}
        </AppLink>

        <HStack className={classes.actions} gap='16'>
          <NotificationButton />

          <AvatarDropdown storybookAvatar={storybookAvatar} />
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
