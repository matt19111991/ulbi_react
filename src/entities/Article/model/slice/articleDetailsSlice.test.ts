import { article } from '@/shared/lib/generators/articles';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice', () => {
  test('test set pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      error: 'Error',
      isLoading: false,
    };

    const reducer = articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending);

    expect(reducer).toEqual({ error: undefined, isLoading: true });
  });

  test('test set fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      data: undefined,
      isLoading: true,
    };

    const reducer = articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.fulfilled(article, '', ''), // 2 и 3 аргументы - заглушки
    );

    expect(reducer).toEqual({ data: article, isLoading: false });
  });
});
