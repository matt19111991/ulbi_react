import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ asyncReducers, children, initialState }: StoreProviderProps) => {
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  return <Provider store={store}>{children}</Provider>;
};
