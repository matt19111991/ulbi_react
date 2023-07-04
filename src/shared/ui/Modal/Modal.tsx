import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Portal } from 'shared/ui/Portal/Portal';

import classes from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose: () => void;
}

const ANIMATION_DELAY: number = 300;

export const Modal = ({
  children,
  className,
  isOpen,
  lazy,
  onClose,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // <ReturnType<typeof setTimeout>: получаем тип, который возвращает функция 'setTimeout'
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
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
  'useEffect' зависит от 'onKeyDown',
  поэтому 'onKeyDown' нужно мемоизировать или описать внутри 'useEffect' как callback:
  иначе 'onKeyDown' будет пересоздаваться на каждый перерендер,
  будет создаваться новая ссылка на функцию и можно войти в бесконечный цикл перерендеринга
*/
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

/*
  поскольку используем Portal для модалки (модалка изначально отрендерена в DOM),
  то нужно по открытию модалки задавать флаг 'isMounted', чтобы была возможность лениво
  подгрузить компонент в модалку или установить фокус на элементы внутри модалки
*/useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

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

  // если модалка лениво подгружается и её еще не открывали => возвращаем 'null'
  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods, [className])}>
        <div className={classes.overlay} onClick={closeHandler}>
          <div className={classes.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
