import { StateSchema } from '@/app/providers/StoreProvider';

import {
  getArticleRecommendationsAreLoading,
  getArticleRecommendationsError,
} from './recommendations';

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

  describe('getArticleRecommendationsError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsPage: {
          recommendations: {
            error: 'Error',
          },
        },
      };

      expect(getArticleRecommendationsError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleRecommendationsError(state as StateSchema)).toBe(undefined);
    });
  });
});
