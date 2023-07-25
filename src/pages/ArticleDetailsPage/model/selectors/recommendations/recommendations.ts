import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsAreLoading = (
  state: StateSchema,
) => state.articleDetailsRecommendations?.areLoading;

export const getArticleRecommendationsError = (
  state: StateSchema,
) => state.articleDetailsRecommendations?.error;
