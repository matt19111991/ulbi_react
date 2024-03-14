import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useStore } from 'react-redux';
import type { Reducer } from '@reduxjs/toolkit';

import { rootReducer } from '@/app/providers/StoreProvider';
import type { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

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

interface DynamicModuleLoaderV2Props {
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

export const DynamicModuleLoaderV2 = ({
  children,
  reducers,
  removeAfterUnmount = true,
}: DynamicModuleLoaderV2Props) => {
  const dispatch = useAppDispatch();
  const store = useStore<StateSchema>();

  const state = store.getState();

  useEffect(() => {
    // пробегаемся по всем редюсерам

    /*
      здесь результат работы 'Object.entries' приводим к типам явно, т.к 'Object.entries' возвращает
      свои типы, которые нам не подходят
    */
    (Object.entries(reducers) as Array<[StateSchemaKey, ReducerItem<StateSchemaKey>]>).forEach(
      ([name, reducer]) => {
        const mounted = name in state;

        if (!mounted) {
          // асинхронно подгружаем редюсер при монтировании компонента
          rootReducer.inject({
            reducerPath: name,
            reducer,
          });

          dispatch({ type: `@INIT ${name} reducer` }); // для индикации подгрузки редюсера
        }
      },
    );

    // удаляем редюсер при демонтировании компонента
    return () => {
      if (removeAfterUnmount) {
        /*
          здесь результат работы 'Object.keys' приводим к типам явно, т.к 'Object.keys' возвращает
          ключи с типом 'string', а не 'StateSchemaKey'
        */
        (Object.keys(reducers) as Array<StateSchemaKey>).forEach((name) => {
          /*
            документация рекомендует передавать функцию 'reducer: () => null', что правильно,
            т.к. редюсер - это функция, но в таком случае после удаления редюсера
            в хранилище получаем: '{ api: { ... }, user: { ... }, [reducerName]: null }' и
            слайс заново не инжектится, т.к. ключ для редюсера уже есть в сторе

            чтобы полностью удалить редюсер из стора, передаем: 'reducer: null as unknown as Reducer<unknown>',
            но в таком случаем получаем ошибку в консоли: "Unexpected key [reducerKey] found in previous state
            received by the reducer. Expected to find one of the known reducer keys instead: 'counter',
            'pageScroll', 'user', 'api'. Unexpected keys will be ignored."

            ошибку можно исправить при помощи 'combineSlicesAvoidErrorMessageMiddleware'
          */

          rootReducer.inject(
            { reducerPath: name, reducer: null as unknown as Reducer<unknown> },
            { overrideExisting: true }, // для корректного добавления / удаления редюсеров
          );

          dispatch({ type: `@DESTROY ${name} reducer` }); // для индикации удаления редюсера
        });
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return children;
};
