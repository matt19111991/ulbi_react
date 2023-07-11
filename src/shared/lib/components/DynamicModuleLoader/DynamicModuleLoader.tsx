import { JSX, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

// на случай подгрузки сразу нескольких редюсеров
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer; // ключ: StateSchemaKey, значение: редюсер
};

type ReducersListEntry = [StateSchemaKey, Reducer]; // entry редюсера при переборе в Object.entries

interface DynamicModuleLoaderProps {
  children: JSX.Element;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
  children,
  reducers,
  removeAfterUnmount,
}: DynamicModuleLoaderProps) => {
  const dispatch = useAppDispatch();

  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    // пробегаемся по всем редюсерам

    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      // асинхронно подгружаем редюсер при монтировании компонента
      store.reducerManager.add(name, reducer);

      dispatch({ type: `@INIT ${name} reducer` }); // для индикации подгрузки редюсера
    });

    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers).forEach((name: StateSchemaKey) => {
          // удаляем редюсер при демонтировании компонента
          store.reducerManager.remove(name);

          dispatch({ type: `@DESTROY ${name} reducer` }); // для индикации удаления редюсера
        });
      }
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return children;
};
