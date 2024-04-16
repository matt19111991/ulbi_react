import type { StateSchema } from '@/app/providers/StoreProvider';

/*
  селектор 'getArticleComments' из 'createEntityAdapter' предоставляет свои методы
  для получения стейта, можно не писать селекторы вручную для 'ids' или 'entities',
  но для кастомных полей 'isLoading' и 'error' нужны отдельные селекторы
*/

export const getArticleCommentsAreLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.areLoading ?? true;

export const getArticleCommentsError = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.error;
