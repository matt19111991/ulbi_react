import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article/testing';

import { generateArticles } from '@/shared/lib/generators/articles';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { fetchArticlesList } from './fetchArticlesList';

const articles = generateArticles(2);

describe('fetchArticlesList', () => {
  describe('success', () => {
    test('with params', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          limit: 4,
          order: 'asc',
          page: 1,
          search: 'search_value',
          sort: ArticleSortField.CREATED,
          type: ArticleType.IT,
        },
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      // указываем, что должно вернуться из 'get' запроса
      thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(thunk.api.get).toHaveBeenCalledWith('articles', {
        params: {
          q: 'search_value',
          type: 'IT',
          _expand: 'user',
          _limit: 4,
          _order: 'asc',
          _page: 1,
          _sort: 'createdAt',
        },
      });

      expect(result.meta.requestStatus).toBe('fulfilled');

      expect(result.payload).toEqual(articles);
    });

    test('all types', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          limit: 4,
          order: 'asc',
          page: 1,
          search: 'search_value',
          sort: ArticleSortField.CREATED,
          type: ArticleType.ALL,
        },
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      // указываем, что должно вернуться из 'get' запроса
      thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(thunk.api.get).toHaveBeenCalledWith('articles', {
        params: {
          q: 'search_value',
          type: undefined,
          _expand: 'user',
          _limit: 4,
          _order: 'asc',
          _page: 1,
          _sort: 'createdAt',
        },
      });

      expect(result.meta.requestStatus).toBe('fulfilled');

      expect(result.payload).toEqual(articles);
    });

    test('no params', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {},
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      // указываем, что должно вернуться из 'get' запроса
      thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(thunk.api.get).toHaveBeenCalledWith('articles', {
        params: {
          q: '',
          type: undefined,
          _expand: 'user',
          _limit: undefined,
          _order: 'asc',
          _page: 1,
          _sort: 'createdAt',
        },
      });

      expect(result.meta.requestStatus).toBe('fulfilled');

      expect(result.payload).toEqual(articles);
    });
  });

  describe('error', () => {
    test('no articles data', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {},
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      // указываем, что должно вернуться из 'get' запроса
      thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(thunk.api.get).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('rejected');

      expect(result.payload).toBe('No articles data');
    });
  });
});
