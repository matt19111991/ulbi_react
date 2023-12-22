import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Hook<T, Arg> = (...args: Arg[]) => T;

type Selector<T, Arg> = (state: StateSchema, ...args: Arg[]) => T;

type Result<T, Args> = [Hook<T, Args>, Selector<T, Args>];

/**
 * Избавляемся от необходимости использовать 'useSelector' каждый раз внутри компонентов
 * @param selector
 */

export const buildSelector = <T, Arg>(selector: Selector<T, Arg>): Result<T, Arg> => {
  const useSelectorHook: Hook<T, Arg> = (...args: Arg[]) =>
    useSelector((state: StateSchema) => selector(state, ...args));

  // возвращаем кортеж из кастомного хука для получения значения селектора и сам селектор
  return [useSelectorHook, selector];
};
