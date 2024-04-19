import type { Action } from '@reduxjs/toolkit';

import { article } from '@/shared/lib/generators/articles';

import { editArticle } from '../services/editArticle/editArticle';

import type { EditArticleFormSchema } from '../types/editArticleFormSchema';

import { editArticleFormActions, editArticleFormReducer } from './editArticleFormSlice';

describe('editArticleFormSlice', () => {
  describe('sync actions', () => {
    test('test clear error', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'Edit article form error',
      };

      expect(
        editArticleFormReducer(state as EditArticleFormSchema, editArticleFormActions.clearError()),
      ).toEqual({
        error: undefined,
      });
    });
  });

  describe('async editArticle action', () => {
    test('test set is pending', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'Edit article form error',
        isLoading: false,
      };

      expect(
        editArticleFormReducer(state as EditArticleFormSchema, editArticle.pending as Action),
      ).toEqual({
        error: undefined,
        isLoading: true,
      });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<EditArticleFormSchema> = {
        error: 'Edit article form error',
        isLoading: true,
      };

      expect(
        editArticleFormReducer(state as EditArticleFormSchema, editArticle.fulfilled as Action),
      ).toEqual({
        error: undefined,
        isLoading: false,
      });
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<EditArticleFormSchema> = {
        error: undefined,
        isLoading: true,
      };

      const editedForm = article;
      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'Article'
      */
      const reducer = editArticleFormReducer(
        state as EditArticleFormSchema,
        editArticle.rejected(error, 'requestId', editedForm),
      );

      expect(reducer).toEqual({ error: errorMessage, isLoading: false });
    });
  });
});
