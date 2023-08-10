import { StateSchema } from '@/app/providers/StoreProvider';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './articleDetails';

describe('articleDetails', () => {
  describe('getArticleDetailsData', () => {
    test('should return data', () => {
      const data = {
        id: '1',
        title: 'Test title',
      };

      const state: DeepPartial<StateSchema> = {
        articleDetails: { data },
      };

      expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state data', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsData(state as StateSchema)).toBe(undefined);
    });
  });

  describe('getArticleDetailsError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetails: {
          error: 'Error',
        },
      };

      expect(getArticleDetailsError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state error', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsError(state as StateSchema)).toBe(undefined);
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

    test('should work with empty state isLoading', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticleDetailsIsLoading(state as StateSchema)).toBeFalsy();
    });
  });
});
