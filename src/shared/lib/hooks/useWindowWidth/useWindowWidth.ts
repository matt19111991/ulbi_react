import { useCallback, useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  const onChangeWidth = useCallback((): void => {
    setWidth(window.screen.width);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  return width;
};
