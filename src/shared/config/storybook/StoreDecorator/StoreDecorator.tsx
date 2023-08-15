import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';

import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';

import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';

import { pageScrollReducer } from '@/widgets/Page';

import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultReducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
  articleDetails: articleDetailsReducer,
  articleDetailsPage: articleDetailsPageReducer,
  articlesPage: articlesPageReducer,
  loginForm: loginReducer,
  pageScroll: pageScrollReducer,
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
