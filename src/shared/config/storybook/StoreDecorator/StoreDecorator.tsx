import { ReactElement } from 'react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  additionalAsyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (Story: StoryFn): ReactElement<unknown> => {
  const getStoreProvider = () => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultReducers, ...additionalAsyncReducers }}
    >
      <Story />
    </StoreProvider>
  );

  return getStoreProvider();
};
