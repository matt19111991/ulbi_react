import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

import { articleDetailsReducer } from 'entities/Article';

import { addCommentFormReducer } from 'features/AddCommentForm';
import { loginReducer } from 'features/AuthByUsername';
import { profileReducer } from 'features/EditableProfileCard';

import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice';

import { pageScrollReducer } from 'widgets/Page';

import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

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
