import { ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import classes from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose: () => void;
}

export const Modal = ({ children, className, isOpen, lazy, onClose }: ModalProps) => {
  const { isMounted, isClosing, onCloseModal } = useModal({ animationDelay: 300, isOpen, onClose });

  const { theme } = useTheme();

  const mods: Mods = {
    [classes.isClosing]: isClosing,
    [classes.opened]: isOpen,
  };

  // если модалка лениво подгружается и её еще не открывали => возвращаем 'null'
  if (lazy && !isMounted) {
    return null;
  }

  const additionalClasses = [
    className,
    theme,
    toggleFeatures({
      name: 'isAppRedesigned',
      on: () => classes.modalNew,
      off: () => classes.modalOld,
    }),
  ];

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div className={classNames(classes.Modal, mods, additionalClasses)}>
        <Overlay onClick={onCloseModal} />

        <div className={classes.content}>{children}</div>
      </div>
    </Portal>
  );
};
