import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { ReducersMapObject } from '@reduxjs/toolkit';

import type { StateSchema } from '../config/StateSchema';

import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  /**
   * Асинхронно подгружаемые редюсеры
   */
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;

  /**
   * Содержимое провайдера
   */
  children?: ReactNode;

  /**
   * Начальное состояние
   */
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ asyncReducers, children, initialState }: StoreProviderProps) => {
  /*
    дополнительная функция 'createReduxStore' вместо использования 'store' напрямую:
    для переиспользования 'store' в 'jest', 'storybook' и других местах
  */
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  return <Provider store={store}>{children}</Provider>;
};
