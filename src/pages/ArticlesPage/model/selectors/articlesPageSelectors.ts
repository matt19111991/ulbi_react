import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageAreLoading = (
  state: StateSchema,
) => state.articlesPage?.areLoading || false;

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
