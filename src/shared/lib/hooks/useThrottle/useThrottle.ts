import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const canRunCallback = useRef(true); // триггер для запуска 'callback'

  return useCallback((...args: any []) => {
    if (canRunCallback.current) {
//   'callback' отрабатывает, только если 'canRunCallback' === true
      callback(...args);

//    запустили 'callback' и сразу отметили, что больше его запускать нельзя ('canRunCallback' === false)
      canRunCallback.current = false;

//    по истечению переданной задержки, можно запускать 'callback' ещё раз ('canRunCallback' === true)
      setTimeout(() => {
        canRunCallback.current = true;
      }, delay);
    }
  }, [callback, delay]);
};
