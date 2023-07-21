import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesPageAreLoading = (
  state: StateSchema,
) => state.articlesPage?.areLoading || false;

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit;

export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view;
