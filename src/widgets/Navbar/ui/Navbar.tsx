import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginModal } from 'features/AuthByUsername';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback((): void => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback((): void => {
    setIsAuthModal(true);
  }, []);

  return (
    <div className={classNames(classes.Navbar, {}, [className])}>
      <Button
        className={classes.links}
        onClick={onShowModal}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('Войти')}
      </Button>

      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
};
