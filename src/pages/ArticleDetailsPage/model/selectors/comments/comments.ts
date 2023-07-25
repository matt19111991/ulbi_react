import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsAreLoading = (
  state: StateSchema,
) => state.articleDetailsComments?.areLoading;

export const getArticleCommentsError = (state: StateSchema) => state.articleDetailsComments?.error;
