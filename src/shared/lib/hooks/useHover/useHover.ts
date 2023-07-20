import { useCallback, useMemo, useState } from 'react';

// для управления наведением мыши через JS

interface UseHoverHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHover = [boolean, UseHoverHandlers];

export const useHover = (): UseHover => {
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
