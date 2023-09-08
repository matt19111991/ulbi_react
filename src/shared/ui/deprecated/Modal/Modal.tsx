import { ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

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

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Modal = ({ children, className, isOpen, lazy, onClose }: ModalProps) => {
  const { isMounted, isClosing, onCloseModal } = useModal({ animationDelay: 300, isOpen, onClose });

  const mods: Mods = {
    [classes.isClosing]: isClosing,
    [classes.opened]: isOpen,
  };

  // если модалка лениво подгружается и её еще не открывали => возвращаем 'null'
  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods)}>
        <Overlay onClick={onCloseModal} />

        <div className={classNames(classes.content, mods, [className])}>{children}</div>
      </div>
    </Portal>
  );
};
