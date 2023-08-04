import { useEffect } from 'react';

// 'callback' должен отрабатывать только при монтировании, поэтому убираем 'callback' из зависимостей 'useEffect'

export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ === 'front-end') { // игнорируем запуск в 'storybook' или 'jest' средах
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
