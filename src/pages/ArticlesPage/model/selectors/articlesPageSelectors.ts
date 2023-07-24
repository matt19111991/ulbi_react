import { StateSchema } from 'app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from 'entities/Article';

export const getArticlesPageAreLoading = (
  state: StateSchema,
) => state.articlesPage?.areLoading || false;

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;

export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?.inited;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit;

export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';

export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';

export const getArticlesPageSort = (
  state: StateSchema,
) => state.articlesPage?.sort ?? ArticleSortField.CREATED;

export const getArticlesPageView = (
  state: StateSchema,
) => state.articlesPage?.view ?? ArticleView.PLATE;
