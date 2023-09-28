import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateArticleFormError = (state: StateSchema) => state.createArticleForm?.error;

export const getCreateArticleFormIsLoading = (state: StateSchema) =>
  state.createArticleForm?.isLoading ?? false;
