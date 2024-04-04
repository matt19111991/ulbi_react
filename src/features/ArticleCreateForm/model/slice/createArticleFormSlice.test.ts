import type { Action } from '@reduxjs/toolkit';

import { createArticle } from '../services/createArticle/createArticle';

import type { CreateArticleForm, CreateArticleFormSchema } from '../types/createArticleFormSchema';

import { createArticleFormActions, createArticleFormReducer } from './createArticleFormSlice';

describe('createArticleFormSlice', () => {
  describe('sync actions', () => {
    test('test clear error', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'Create article form error',
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

  describe('async createArticle action', () => {
    test('test set is pending', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'Create article form error',
        isLoading: false,
      };

      expect(
        createArticleFormReducer(state as CreateArticleFormSchema, createArticle.pending as Action),
      ).toEqual({
        error: undefined,
        isLoading: true,
      });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<CreateArticleFormSchema> = {
        error: 'Create article form error',
        isLoading: true,
      };

      expect(
        createArticleFormReducer(
          state as CreateArticleFormSchema,
          createArticle.fulfilled as Action,
        ),
      ).toEqual({
        error: undefined,
        isLoading: false,
      });
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<CreateArticleFormSchema> = {
        error: undefined,
        isLoading: true,
      };

      const form: CreateArticleForm = {
        blocks: [],
        img: '',
        subtitle: '',
        title: 'New article title',
        type: [],
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'CreateArticleForm'
       */
      const reducer = createArticleFormReducer(
        state as CreateArticleFormSchema,
        createArticle.rejected(error, 'requestId', form),
      );

      expect(reducer).toEqual({ error: errorMessage, isLoading: false });
    });
  });
});
