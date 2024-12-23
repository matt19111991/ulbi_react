import { useCallback, useRef } from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет 'delay'
 * @param callback
 * @param delay - задержка в мс
 */
export const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  return useCallback(
    (...args: T[]) => {
      /*
        2. если вызовем функцию (обернутую в 'useDebounce') ещё раз, а таймер уже
        запущен ('timer.current !== null'), т.е. прошло времени меньше, чем 'delay',
        то очищаем 'timer' ('callback' запущен не будет)
      */

      if (timer.current) {
        clearTimeout(timer.current);
      }

      // 1. создали таймер, через 'delay' мс запустится 'callback '('callback' пока не вызывается)
      timer.current = setTimeout(() => {
        /*
          3. 'callback' отработает по истечению 'delay' мс,
          если функция (обернутая в 'useDebounce') не будет вызвана раньше 'delay'
        */
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
