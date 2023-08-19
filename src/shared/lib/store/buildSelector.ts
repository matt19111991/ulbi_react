import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;

type Result<T> = [() => T, Selector<T>];

// избавляемся от необходимости использовать 'useSelector' каждый раз внутри компонентов

export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
  const useSelectorHook = () => useSelector(selector);

  // возвращаем кортеж из кастомного хука для получения значения селектора и сам селектор
  return [useSelectorHook, selector];
};
