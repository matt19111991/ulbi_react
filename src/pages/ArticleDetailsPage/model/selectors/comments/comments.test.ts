import type { StateSchema } from '@/app/providers/StoreProvider';

import { getArticleCommentsAreLoading, getArticleCommentsError } from './comments';

describe('comments selectors', () => {
  describe('getArticleCommentsAreLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsPage: {
          comments: {
            areLoading: true,
          },
        },
      };

      expect(getArticleCommentsAreLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with default state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleCommentsAreLoading(state as StateSchema)).toBeTruthy();
    });
  });

  describe('getArticleCommentsError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsPage: {
          comments: {
            error: 'Article comments error',
          },
        },
      };

      expect(getArticleCommentsError(state as StateSchema)).toBe('Article comments error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleCommentsError(state as StateSchema)).toBeUndefined();
    });
  });
});
