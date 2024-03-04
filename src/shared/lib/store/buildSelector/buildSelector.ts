import { useSelector } from 'react-redux';

import type { StateSchema } from '@/app/providers/StoreProvider';

// 'Arg' оставляем в конце, т.к они могут и не передаваться

type Hook<Result, Arg> = (...args: Arg[]) => Result;

type Selector<Result, Arg> = (state: StateSchema, ...args: Arg[]) => Result;

type Return<Result, Arg> = [Hook<Result, Arg>, Selector<Result, Arg>];

/**
 * Избавляемся от необходимости использовать 'useSelector' каждый раз внутри компонентов
 * @param selector
 */
export const buildSelector = <Result, Arg>(
  selector: Selector<Result, Arg>,
): Return<Result, Arg> => {
  const useSelectorHook: Hook<Result, Arg> = (...args: Arg[]) =>
    useSelector((state: StateSchema) => selector(state, ...args));

  // возвращаем кортеж из кастомного хука для получения значения селектора и сам селектор
  return [useSelectorHook, selector];
};
