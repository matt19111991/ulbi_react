import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsAreLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.areLoading ?? true;

export const getArticleCommentsError = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.error;
