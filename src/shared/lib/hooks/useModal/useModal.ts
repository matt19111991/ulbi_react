import {
// RefObject,        // ref, который нельзя менять
   MutableRefObject, // ref, который можно менять
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';

interface UseModalProps {
  animationDelay: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const useModal = ({ animationDelay, isOpen, onClose }: UseModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // <ReturnType<typeof setTimeout>: получаем тип, который возвращает функция 'setTimeout'
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const onCloseModal = useCallback(() => {
    if (onClose) {
      setIsClosing(true); // при нажатии на зону backdrop-а: 'isClosing' становится 'true'

      timerRef.current = setTimeout(() => {
        onClose();

        // по истечению анимации закрытия модального окна: 'isClosing' становится 'false'
        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

/*
  'useEffect' зависит от 'onKeyDown',
  поэтому 'onKeyDown' нужно мемоизировать или описать внутри 'useEffect' как callback:
  иначе 'onKeyDown' будет пересоздаваться на каждый перерендер,
  будет создаваться новая ссылка на функцию и можно войти в бесконечный цикл перерендеринга
*/
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCloseModal();
    }
  }, [onCloseModal]);

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

  return {
    isClosing,
    isMounted,
    onCloseModal,
  };
};
