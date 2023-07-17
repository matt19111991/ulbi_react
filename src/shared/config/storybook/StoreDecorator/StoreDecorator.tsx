import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

import { articleDetailsReducer } from 'entities/Article';
import { profileReducer } from 'entities/Profile';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
  loginForm: loginReducer,
  profile: profileReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  additionalAsyncReducers?: ReducersList,
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
