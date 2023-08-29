import { JSX, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

// на случай подгрузки сразу нескольких редюсеров
export type ReducersList = {
  /*
     ключ: StateSchemaKey, значение: редюсер

     Reducer => редюсер типа 'any' (без уточнений, без переданной схемы). Принимает любой редюсер

     Reducer<NonNullable<StateSchema[name]>> => принимает NonNullable редюсер (не null и не undefined),
     основываясь на названии поля из 'StateSchema'. Достаем из 'StateSchema' конкретную часть 'state'.
     Если в 'store' мы перепутаем редюсер и присвоим не под тем ключом => TS выдаст ошибку, т.к.
     'StateSchema' не соответствует созданному 'store'
  */
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
  children: JSX.Element;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
  children,
  reducers,
  removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
  const dispatch = useAppDispatch();

  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    // пробегаемся по всем редюсерам

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      if (!mounted) {
        // асинхронно подгружаем редюсер при монтировании компонента

        /* без 'name as StateSchemaKey' => ошибка "Argument of type 'string' is not assignable
           to parameter of type 'keyof StateSchema'"
        */
        store.reducerManager.add(name as StateSchemaKey, reducer);

        dispatch({ type: `@INIT ${name} reducer` }); // для индикации подгрузки редюсера
      }
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
