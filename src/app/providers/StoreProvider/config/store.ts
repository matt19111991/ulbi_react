import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,

    ...asyncReducers,
  };

  // для возможности использования асинхронных редюсеров
  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    devTools: __IS_DEV__,

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
