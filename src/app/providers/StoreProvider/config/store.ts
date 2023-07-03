import { configureStore } from '@reduxjs/toolkit';

import { counterReducer } from 'entities/Counter';

import { StateSchema } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore<StateSchema>({
    devTools: __IS_DEV__,

    // инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
    preloadedState: initialState,

    reducer: {
      counter: counterReducer,
    },
  });
};
