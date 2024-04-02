import type { Action } from '@reduxjs/toolkit';

import { article } from '@/shared/lib/generators/articles';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

import type { ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice', () => {
  describe('async fetchArticleById action', () => {
    test('test set is pending', () => {
      const state: DeepPartial<ArticleDetailsSchema> = {
        error: 'Article details error',
        isLoading: false,
      };

      const reducer = articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.pending as Action,
      );

      expect(reducer).toEqual({ error: undefined, isLoading: true });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<ArticleDetailsSchema> = {
        data: undefined,
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers' обязательно нужно передавать:
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае "Article['id']"
       */
      const reducer = articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled(article, 'requestId', '1'),
      );

      expect(reducer).toEqual({ data: article, isLoading: false });
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<ArticleDetailsSchema> = {
        error: undefined,
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае "Article['id']"
       */
      const reducer = articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.rejected(error, 'requestId', '1'),
      );

      expect(reducer).toEqual({ error: errorMessage, isLoading: false });
    });
  });
});
