import { StateSchema } from '@/app/providers/StoreProvider';

import { getEditArticleFormError, getEditArticleFormIsLoading } from './editArticleFormSelectors';

describe('edit article form selectors', () => {
  describe('getEditArticleFormIsLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        editArticleForm: {
          isLoading: true,
        },
      };

      expect(getEditArticleFormIsLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getEditArticleFormIsLoading(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getEditArticleFormError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        editArticleForm: {
          error: 'Error',
        },
      };

      expect(getEditArticleFormError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getEditArticleFormError(state as StateSchema)).toBe(undefined);
    });
  });
});
