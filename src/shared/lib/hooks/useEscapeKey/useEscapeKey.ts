import { useCallback, useEffect } from 'react';

/**
 * Хук для перехвата и обработки события для клавиши 'Esc'
 * @param onKeyDownHandler
 */
export const useEscapeKey = (onKeyDownHandler: () => void): void => {
  /*
   'useEffect' зависит от 'onKeyDown()',
    поэтому 'onKeyDown()' нужно мемоизировать или описать внутри 'useEffect' как 'callback':
      иначе 'onKeyDown()' будет пересоздаваться на каждый перерендер, следовательно,
      будет создаваться новая ссылка на функцию и можно войти в бесконечный цикл перерендеринга
  */
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onKeyDownHandler();
      }
    },
    [onKeyDownHandler],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};
