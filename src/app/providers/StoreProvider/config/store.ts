import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { $api } from 'shared/api/api';

import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,

    ...asyncReducers,
  };

  // для возможности использования асинхронных редюсеров
  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    devTools: __IS_DEV__,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api, // добавляем в 'RTK' возможность использовать кастомный инстанс 'axios'
          navigate,  // можно пользоваться навигацией внутри 'async thunks'
        },
      },
    }),

    // инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
    preloadedState: initialState,

    // reducer: rootReducers,       // по умолчанию, когда все редюсеры синхронные
    reducer: reducerManager.reduce, // для работы с асинхронными редюсерами
  });

  // для возможности использования асинхронных редюсеров
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

// кастомная типизация 'dispatch', чтобы типы экшенов, схем, хранилища подхватывались TypeScript-ом

//                        возвращаем  тип   хранилища (store), затем извлекаем метод 'dispatch' из типа
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']; // === typeof store.dispatch
