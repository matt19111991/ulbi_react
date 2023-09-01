import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Hook<T, Args extends any[]> = (...args: Args) => T;

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;

type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

// избавляемся от необходимости использовать 'useSelector' каждый раз внутри компонентов

export const buildSelector = <T, Args extends any[]>(
  selector: Selector<T, Args>,
): Result<T, Args> => {
  const useSelectorHook: Hook<T, Args> = (...args: Args) =>
    useSelector((state: StateSchema) => selector(state, ...args));

  // возвращаем кортеж из кастомного хука для получения значения селектора и сам селектор
  return [useSelectorHook, selector];
};
