import { JSX, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

// на случай подгрузки сразу нескольких редюсеров
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer; // ключ: StateSchemaKey, значение: редюсер
};

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

    Object.entries(reducers).forEach(([name, reducer]) => {
      // асинхронно подгружаем редюсер при монтировании компонента

      /* без 'name as StateSchemaKey' => ошибка "Argument of type 'string' is not assignable
         to parameter of type 'keyof StateSchema'"
      */
      store.reducerManager.add(name as StateSchemaKey, reducer);

      dispatch({ type: `@INIT ${name} reducer` }); // для индикации подгрузки редюсера
    });

    return () => {
      if (removeAfterUnmount) {
        Object.keys(reducers).forEach((name) => {
          // удаляем редюсер при демонтировании компонента

          /* без 'name as StateSchemaKey' => ошибка "Argument of type 'string' is not assignable
             to parameter of type 'keyof StateSchema'"
          */
          store.reducerManager.remove(name as StateSchemaKey);

          dispatch({ type: `@DESTROY ${name} reducer` }); // для индикации удаления редюсера
        });
      }
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return children;
};
