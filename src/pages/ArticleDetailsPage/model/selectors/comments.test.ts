import { StateSchema } from 'app/providers/StoreProvider';

import { getArticleCommentsAreLoading, getArticleCommentsError } from './comments';

describe('comments selectors', () => {
  describe('getArticleCommentsAreLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsComments: {
          areLoading: true,
        },
      };

      expect(getArticleCommentsAreLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleCommentsAreLoading(state as StateSchema)).toBe(undefined);
    });
  });

  describe('getArticleCommentsError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetailsComments: {
          error: 'Error',
        },
      };

      expect(getArticleCommentsError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleCommentsError(state as StateSchema)).toBe(undefined);
    });
  });
});
