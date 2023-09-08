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
import { ToggleFeatures } from '@/shared/lib/features';

import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
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
      <ToggleFeatures
        feature='isAppRedesigned'
        // Navbar после редизайна для авторизованного пользователя
        on={
          <header className={classNames(classes.NavbarRedesigned, {}, [className])}>
            <HStack className={classes.actions} gap='16'>
              <NotificationButton />

              <AvatarDropdown storybookAvatar={storybookAvatar} />
            </HStack>
          </header>
        }
        // Navbar до редизайна для авторизованного пользователя
        off={
          <header className={classNames(classes.Navbar, {}, [className])}>
            <div className={classes.logoWrapper}>
              <Icon className={classes.logo} height={60} Svg={Logo} width={60} />
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
        }
      />
    );
  }

  return (
    <header className={classNames(classes.Navbar, {}, [className])}>
      <Button className={classes.links} onClick={onShowModal} theme={ButtonTheme.CLEAR_INVERTED}>
        {t('Войти')}
      </Button>

      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  );
});

Navbar.displayName = 'Navbar';
