import { useCallback, useMemo, useState } from 'react';

interface UseHoverHandlers {
  /**
   * Обработчик события наведения мыши
   */
  onMouseEnter: () => void;

  /**
   * Обработчик события потери наведения мыши
   */
  onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverHandlers];

/**
 * Хук для управления наведением мыши через 'JS'
 */
export const useHover = (): UseHoverResult => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave],
  );
};
