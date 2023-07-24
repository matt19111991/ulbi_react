import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  return useCallback((...args: any []) => {
/*  2. если вызовем функцию (обернутую в 'useDebounce') ещё раз,
    а таймер уже запущен ('timer.current !== null'),
    т.е. прошло времени меньше, чем 'delay',
    то очищаем 'timer' ('callback' запущен не будет)

*/  if (timer.current) {
      clearTimeout(timer.current);
    }

//  1. создали таймер, через 'delay' мс запустится 'callback '('callback' пока не вызывается)
    timer.current = setTimeout(() => {
/*    3. 'callback' отработает по истечению 'delay' мс,
      если функция (обернутая в 'useDebounce') не будет вызвана раньше 'delay'
*/    callback(...args);
    }, delay);
  }, [callback, delay]);
};
