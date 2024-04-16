import { StateSchema } from '@/app/providers/StoreProvider';

import { getArticleRecommendationsAreLoading } from './recommendations';

describe('recommendations selectors', () => {
  describe('getArticleRecommendationsAreLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsPage: {
          recommendations: {
            areLoading: true,
          },
        },
      };

      expect(getArticleRecommendationsAreLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleRecommendationsAreLoading(state as StateSchema)).toBe(undefined);
    });
  });
});
