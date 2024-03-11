import { useCallback, useEffect, useRef, useState } from 'react';

import type {
  MutableRefObject, // 'ref', который можно менять
  // RefObject,     // 'ref', который нельзя менять
} from 'react';

interface UseModalProps {
  /**
   * Задержка анимации при закрытии окна; открытие окна происходит через 'CSS' (анимация 'appear')
   */
  animationCloseDelay: number;

  /**
   * Состояние (открыто / закрыто)
   */
  isOpen?: boolean;

  /**
   * Колбэк, отрабатывающий на закрытие окна
   */
  onClose?: () => void;
}

/**
 * Переиспользуемый хук для модальных компонентов ('Drawer' / 'Modal')
 * @param animationCloseDelay
 * @param isOpen
 * @param onClose
 */
export const useModal = ({ animationCloseDelay, isOpen, onClose }: UseModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 'ReturnType<typeof setTimeout>' => получаем тип, который возвращает функция 'setTimeout()'
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const onCloseModal = useCallback(() => {
    if (onClose) {
      setIsClosing(true); // при нажатии на зону 'backdrop'-а => 'isClosing' становится 'true'

      timerRef.current = setTimeout(() => {
        onClose();

        // по истечению анимации закрытия модального окна => 'isClosing' становится 'false'
        setIsClosing(false);
      }, animationCloseDelay);
    }
  }, [animationCloseDelay, onClose]);

  /*
    последний 'useEffect' зависит от 'onKeyDown()',
    поэтому 'onKeyDown()' нужно мемоизировать или описать внутри 'useEffect' как 'callback':
      иначе 'onKeyDown()' будет пересоздаваться на каждый перерендер, следовательно,
      будет создаваться новая ссылка на функцию и можно войти в бесконечный цикл перерендеринга
  */

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal],
  );

  /*
    модалка будет отрендерена в 'DOM' после ленивой загрузки и останется в 'DOM' после закрытия;
    без ленивой загрузки модалка всегда будет в 'DOM'

    поскольку используем 'Portal', то нужно по открытию модалки задавать ей флаг
    'isMounted', чтобы была возможность лениво подгрузить компонент в модалку или
    установить фокус на элементы внутри модалки
  */

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      /*
        находим инпуты с классом 'autofocus', т.к. в случаях, когда модалка не удаляется из 'DOM',
        фокус через 'ref' в 'Input' компонентах сам не установится
      */
      const autoFocusingInputs = document.getElementsByClassName(
        'autofocus',
      ) as HTMLCollectionOf<HTMLInputElement>;

      // устанавливаем фокус на первый найденный инпут с классом 'autofocus'
      if (autoFocusingInputs.length) {
        const [input] = autoFocusingInputs;

        input.focus();
      }
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
