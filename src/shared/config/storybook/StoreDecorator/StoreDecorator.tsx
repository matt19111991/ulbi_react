import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import { articleDetailsReducer } from 'entities/Article';
import { profileReducer } from 'entities/Profile';

import { addCommentFormReducer } from 'features/AddCommentForm';
import { loginReducer } from 'features/AuthByUsername';

import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultReducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
  articleDetails: articleDetailsReducer,
  articleDetailsComments: articleDetailsCommentsReducer,
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
