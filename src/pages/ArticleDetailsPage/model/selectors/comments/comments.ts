import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsAreLoading = (
  state: StateSchema,
) => state.articleDetailsPage?.comments?.areLoading;

export const getArticleCommentsError = (
  state: StateSchema,
) => state.articleDetailsPage?.comments?.error;
