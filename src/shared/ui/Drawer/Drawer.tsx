import { ReactNode } from 'react';

import { useTheme } from 'app/providers/ThemeProvider';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Drawer.module.scss';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = ({
  children,
  className,
  isOpen,
  onClose,
}: DrawerProps) => {
  const { theme } = useTheme();

  const mods: Mods = {
    [classes.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={
          classNames(classes.Drawer, mods, [className, theme])
        }
      >
        <Overlay onClick={onClose} />

        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
