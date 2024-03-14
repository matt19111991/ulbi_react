import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useStore } from 'react-redux';
import type { Reducer } from '@reduxjs/toolkit';

import type {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

/*
  тип 'K' ограничиваем значениями только из 'StateSchemaKey'

 'Reducer' => редюсер типа 'unknown' (без уточнений, без переданной схемы), принимает любой редюсер

 'Reducer<NonNullable<StateSchema[name]>>' => принимает 'NonNullable' редюсер (не 'null' и не 'undefined'),
  основываясь на названии поля из 'StateSchema' (достаем из 'StateSchema' конкретную часть 'state')

  Если в 'store' мы перепутаем редюсер и присвоим не под тем ключом =>
 'TS' выдаст ошибку, т.к. 'StateSchema' не соответствует созданному 'store'
*/
type ReducerItem<K extends StateSchemaKey> = Reducer<NonNullable<StateSchema[K]>>;

// на случай подгрузки сразу нескольких редюсеров
export type ReducersList = {
  // ключ: 'StateSchemaKey', значение: редюсер
  [name in StateSchemaKey]?: ReducerItem<name>;
};

interface DynamicModuleLoaderProps {
  /**
   * Дочерние компоненты
   */
  children: ReactNode;

  /**
   * Список редюсеров
   */
  reducers: ReducersList;

  /**
   * Нужно ли удалять редюсер после размонтирования компонента?
   */
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

    /*
      здесь результат работы 'Object.entries' приводим к типам явно, т.к 'Object.entries' возвращает
      свою типизацию, которая нам не подходит
    */
    (Object.entries(reducers) as Array<[StateSchemaKey, ReducerItem<StateSchemaKey>]>).forEach(
      ([name, reducer]) => {
        const mounted = mountedReducers[name];

        if (!mounted) {
          // асинхронно подгружаем редюсер при монтировании компонента
          store.reducerManager.add(name, reducer);

          dispatch({ type: `@INIT ${name} reducer` }); // для индикации подгрузки редюсера
        }
      },
    );

    return () => {
      if (removeAfterUnmount) {
        /*
          здесь результат работы 'Object.keys' приводим к типам явно, т.к 'Object.keys' возвращает
          ключи с типом 'string', а не 'StateSchemaKey'
        */
        (Object.keys(reducers) as Array<StateSchemaKey>).forEach((name) => {
          // удаляем редюсер при демонтировании компонента
          store.reducerManager.remove(name);

          dispatch({ type: `@DESTROY ${name} reducer` }); // для индикации удаления редюсера
        });
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return children;
};
