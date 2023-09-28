import { editArticle } from '../services/editArticle/editArticle';

import { EditArticleFormSchema } from '../types/editArticleFormSchema';

import { editArticleFormActions, editArticleFormReducer } from './editArticleFormSlice';

describe('editArticleFormSlice', () => {
  describe('clearError', () => {
    test('test clear error', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'Error',
      };

      expect(
        editArticleFormReducer(state as EditArticleFormSchema, editArticleFormActions.clearError()),
      ).toEqual({
        error: undefined,
      });
    });
  });

  describe('editArticle service', () => {
    test('test service pending', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'error',
        isLoading: false,
      };

      expect(editArticleFormReducer(state as EditArticleFormSchema, editArticle.pending)).toEqual({
        error: undefined,
        isLoading: true,
      });
    });

    test('test service fulfilled', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'error',
        isLoading: true,
      };

      expect(editArticleFormReducer(state as EditArticleFormSchema, editArticle.fulfilled)).toEqual(
        {
          error: undefined,
          isLoading: false,
        },
      );
    });
  });
});
