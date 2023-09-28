import { createArticle } from '../services/createArticle/createArticle';

import { CreateArticleFormSchema } from '../types/createArticleFormSchema';

import { createArticleFormActions, createArticleFormReducer } from './createArticleFormSlice';

describe('createArticleFormSlice', () => {
  describe('clearError', () => {
    test('test clear error', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'Error',
      };

      expect(
        createArticleFormReducer(
          state as CreateArticleFormSchema,
          createArticleFormActions.clearError(),
        ),
      ).toEqual({
        error: undefined,
      });
    });
  });

  describe('createArticle service', () => {
    test('test service pending', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'error',
        isLoading: false,
      };

      expect(
        createArticleFormReducer(state as CreateArticleFormSchema, createArticle.pending),
      ).toEqual({
        error: undefined,
        isLoading: true,
      });
    });

    test('test service fulfilled', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'error',
        isLoading: true,
      };

      expect(
        createArticleFormReducer(state as CreateArticleFormSchema, createArticle.fulfilled),
      ).toEqual({
        error: undefined,
        isLoading: false,
      });
    });
  });
});
