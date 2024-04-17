import type { StateSchema } from '@/app/providers/StoreProvider';

export const getEditArticleFormError = (state: StateSchema) => state.editArticleForm?.error;

export const getEditArticleFormIsLoading = (state: StateSchema) =>
  state.editArticleForm?.isLoading ?? false;
