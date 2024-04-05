import { useEffect } from 'react';

/**
 * Хук, который вызывает колбэк при монтировании компонента
 * @param callback
 */
export const useInitialEffect = (callback: () => void) => {
  // 'callback' должен отрабатывать только при монтировании, поэтому убираем 'callback' из зависимостей 'useEffect'

  useEffect(() => {
    // игнорируем запуск в 'jest' и 'storybook' средах
    if (__PROJECT__ === 'front-end') {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
