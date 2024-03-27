import { useCallback, useEffect, useState } from 'react';

/**
 * Хук для слежения за изменением размеров окна
 */
export const useWindowWidth = () => {
  // 'window.devicePixelRatio' - зум

  const [width, setWidth] = useState(window.screen.width / window.devicePixelRatio);

  const onChangeWidth = useCallback((): void => {
    setWidth(window.screen.width / window.devicePixelRatio);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  return width;
};
