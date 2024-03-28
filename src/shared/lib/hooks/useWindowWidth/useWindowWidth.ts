import { useCallback, useEffect, useState } from 'react';

/**
 * Хук для слежения за изменением размеров окна
 */
export const useWindowWidth = () => {
  // 'window.screen.width' не учитывает зум, поэтому используем 'window.innerWidth'

  const [width, setWidth] = useState(window.innerWidth);

  const onChangeWidth = useCallback((): void => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  return width;
};
