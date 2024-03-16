import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';

import NewArticle from '@/shared/assets/icons/article-new-redesigned.svg';
import Logo from '@/shared/assets/icons/logo.svg';

import { getRouteArticleCreate, getRouteSettings } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { AppLink as AppLinkRedesigned } from '@/shared/ui/redesigned/AppLink';
import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import classes from './Navbar.module.scss';

interface NavbarProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Аватар, пробрасываемый из storybook
   */
  storybookAvatar?: string;
}

export const Navbar = memo(({ className, storybookAvatar }: NavbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback((): void => {
    setIsAuthModal(false);
  }, []);

  const onGoToSettingsPage = useCallback((): void => {
    navigate(getRouteSettings());
  }, [navigate]);

  const onShowModal = useCallback((): void => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => classes.NavbarRedesigned,
    off: () => classes.Navbar,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        // Navbar после редизайна для авторизованного пользователя
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack className={classes.actions} gap='8'>
              <AppLinkRedesigned
                aria-label='create article route'
                className={classes.createLinkRedesigned}
                to={getRouteArticleCreate()}
              >
                <Icon Svg={NewArticle} />
              </AppLinkRedesigned>

              <NotificationButton />

              <AvatarDropdown storybookAvatar={storybookAvatar} />
            </HStack>
          </header>
        }
        // Navbar до редизайна для авторизованного пользователя
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <div className={classes.logoWrapper}>
              <Icon className={classes.logo} height={60} Svg={Logo} width={60} />
            </div>

            <AppLinkDeprecated
              className={classes.createLink}
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
            >
              {t('Создать статью')}
            </AppLinkDeprecated>

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
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <HStack className={classes.links} gap='24' max>
            <ButtonRedesigned onClick={onShowModal} variant='clear'>
              {t('Войти')}
            </ButtonRedesigned>

            <ButtonRedesigned onClick={onGoToSettingsPage} variant='clear'>
              {t('Настройки')}
            </ButtonRedesigned>
          </HStack>
        }
        off={
          <HStack className={classes.links} gap='24' max>
            <ButtonDeprecated onClick={onShowModal} theme={ButtonTheme.CLEAR_INVERTED}>
              {t('Войти')}
            </ButtonDeprecated>

            <ButtonDeprecated onClick={onGoToSettingsPage} theme={ButtonTheme.CLEAR_INVERTED}>
              {t('Настройки')}
            </ButtonDeprecated>
          </HStack>
        }
      />

      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </header>
  );
});

Navbar.displayName = 'Navbar';
