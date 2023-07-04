import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { StateSchema } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
  };

  return configureStore<StateSchema>({
    devTools: __IS_DEV__,

    // инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
    preloadedState: initialState,

    reducer: rootReducers,
  });
};
