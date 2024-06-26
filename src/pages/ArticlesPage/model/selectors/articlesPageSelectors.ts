import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

export const getArticlesPageAreLoading = (state: StateSchema) =>
  state.articlesPage?.areLoading || false;

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error;

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore || false;

/*
  загрузили список статей => перешли на конкретную статью => вернулись обратно к списку =>
  снова началась подгрузка (а должен отобразиться предыдущий загруженный список)
  для того, чтобы отследить этот момент и прекратить ненужную подгрузку, заводим флаг 'inited'
*/
export const getArticlesPageInited = (state: StateSchema) => state.articlesPage?.inited || false;

export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit;

export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page || 1;

export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';

export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';

export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;

export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? ArticleType.ALL;

export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view ?? ArticleView.PLATE;
