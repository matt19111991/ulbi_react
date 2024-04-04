import type { StateSchema } from '@/app/providers/StoreProvider';

import {
  getCreateArticleFormError,
  getCreateArticleFormIsLoading,
} from './createArticleFormSelectors';

describe('create article form selectors', () => {
  describe('getCreateArticleFormIsLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        createArticleForm: {
          isLoading: true,
        },
      };

      expect(getCreateArticleFormIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getCreateArticleFormIsLoading(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getCreateArticleFormError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        createArticleForm: {
          error: 'Create article form error',
        },
      };

      expect(getCreateArticleFormError(state as StateSchema)).toBe('Create article form error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getCreateArticleFormError(state as StateSchema)).toBeUndefined();
    });
  });
});
