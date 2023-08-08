import { ReactNode } from 'react';

import { useTheme } from 'app/providers/ThemeProvider';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Drawer.module.scss';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Drawer = ({
  children,
  className,
  isOpen,
  lazy,
  onClose,
}: DrawerProps) => {
  const { isMounted, isClosing, onCloseModal } = useModal({ animationDelay: 300, isOpen, onClose });

  const { theme } = useTheme();

  const mods: Mods = {
    [classes.isClosing]: isClosing,
    [classes.opened]: isOpen,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={
          classNames(classes.Drawer, mods, [className, theme])
        }
      >
        <Overlay onClick={onCloseModal} />

        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
