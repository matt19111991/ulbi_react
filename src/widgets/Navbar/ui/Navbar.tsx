import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData, userActions } from 'entities/User';

import { LoginModal } from 'features/AuthByUsername';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const dispatch = useDispatch();
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
      <div className={classNames(classes.Navbar, {}, [className])}>
        <Button
          className={classes.links}
          onClick={onLogout}
          theme={ButtonTheme.CLEAR_INVERTED}
        >
          {t('Выйти')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(classes.Navbar, {}, [className])}>
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
    </div>
  );
});

Navbar.displayName = 'Navbar';
