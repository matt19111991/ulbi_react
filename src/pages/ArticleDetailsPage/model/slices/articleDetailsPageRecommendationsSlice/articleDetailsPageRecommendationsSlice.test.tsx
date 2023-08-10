import { generateArticles, generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { fetchArticleRecommendations } from '../../services/fetchArticleRecommendations/fetchArticleRecommendations';

import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema';

import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

describe('articleDetailsPageRecommendationsSlice', () => {
  test('test fetch article recommendations pending', () => {
    const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
      areLoading: false,
      error: 'Error',
    };

    expect(
      articleDetailsPageRecommendationsReducer(
        state as ArticleDetailsRecommendationsSchema,
        fetchArticleRecommendations.pending,
      ),
    ).toEqual({ areLoading: true, error: undefined });
  });

  test('test fetch article recommendations fulfilled', () => {
    const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
      areLoading: true,
    };

    expect(
      articleDetailsPageRecommendationsReducer(
        state as ArticleDetailsRecommendationsSchema,
        fetchArticleRecommendations.fulfilled(generateArticles(4), ''),
      ),
    ).toEqual({
      areLoading: false,
      entities: generateNormalizedArticles(4).entities,
      ids: generateNormalizedArticles(4).ids,
    });
  });
});
