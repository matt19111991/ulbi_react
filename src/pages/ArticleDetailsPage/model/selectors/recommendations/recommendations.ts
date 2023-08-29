import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsAreLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.areLoading;

export const getArticleRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error;
