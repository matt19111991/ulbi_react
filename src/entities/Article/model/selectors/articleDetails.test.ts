import type { StateSchema } from '@/app/providers/StoreProvider';

import { article } from '@/shared/lib/generators/articles';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './articleDetails';

describe('articleDetails', () => {
  describe('getArticleDetailsData', () => {
    test('should return data', () => {
      const data = article;

      const state: DeepPartial<StateSchema> = {
        articleDetails: { data },
      };

      expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state data', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsData(state as StateSchema)).toBeUndefined();
    });
  });

  describe('getArticleDetailsError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetails: {
          error: 'Article details error',
        },
      };

      expect(getArticleDetailsError(state as StateSchema)).toBe('Article details error');
    });

    test('should work with empty state error', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsError(state as StateSchema)).toBeUndefined();
    });
  });

  describe('getArticleDetailsIsLoading', () => {
    test('should return loading state', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetails: {
          isLoading: true,
        },
      };

      expect(getArticleDetailsIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with default state isLoading', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsIsLoading(state as StateSchema)).toBeFalsy();
    });
  });
});
