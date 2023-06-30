import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  onClose: () => void;
  isOpen?: boolean;
}

const ANIMATION_DELAY: number = 300;

export const Modal = ({
  children,
  className,
  onClose,
  isOpen,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  // <ReturnType<typeof setTimeout>: получаем тип, который возвращает функция 'setTimeout'
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();

      setIsClosing(true); // при нажатии на зону backdrop-а: 'isClosing' становится 'true'

      timerRef.current = setTimeout(() => {
        onClose();

        // по истечению анимации закрытия модального окна: 'isClosing' становится 'false'
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

/*
  'useEffect' зависит от 'onKeyDown', поэтому 'onKeyDown' нужно мемоизировать:
  иначе 'onKeyDown' будет пересоздаваться на каждый перерендер,
  будет создаваться новая ссылка на функцию и циклично запускаться 'useEffect'
*/
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);

      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [classes.isClosing]: isClosing,
    [classes.opened]: isOpen,
  };

  return (
    <div className={classNames(classes.Modal, mods, [className])}>
      <div className={classes.overlay} onClick={closeHandler}>
        <div className={classes.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};
