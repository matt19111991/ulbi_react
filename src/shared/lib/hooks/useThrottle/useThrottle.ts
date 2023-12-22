import { useCallback, useRef } from 'react';

/**
 * Хук, который позволяет выполнять коллбэк не чаще указанного промежутка времени 'delay'
 * @param callback
 * @param delay - задержка в мс
 */
export const useThrottle = <T>(callback: (...args: T[]) => void, delay: number) => {
  const canRunCallback = useRef(true); // триггер для запуска 'callback'

  return useCallback(
    (...args: T[]) => {
      if (canRunCallback.current) {
        // 'callback' отрабатывает, только если 'canRunCallback' === true
        callback(...args);

        // запустили 'callback' и сразу отметили, что больше его запускать нельзя ('canRunCallback' === false)
        canRunCallback.current = false;

        // по истечению переданной задержки, можно запускать 'callback' ещё раз ('canRunCallback' === true)
        setTimeout(() => {
          canRunCallback.current = true;
        }, delay);
      }
    },
    [callback, delay],
  );
};
