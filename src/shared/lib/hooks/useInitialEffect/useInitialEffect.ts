import { useEffect } from 'react';

// 'callback' должен отрабатывать только при монтировании, поэтому убираем 'callback' из зависимостей 'useEffect'

export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    // игнорируем запуск в 'storybook' или 'jest' средах
    if (__PROJECT__ === 'front-end') {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
