import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slice/articlesPageSlice');

describe('initArticlesPage', () => {
  describe('success', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        inited: false,
      },
    };

    test('set all params', async () => {
      const searchParams = new URLSearchParams({
        order: 'asc',
        search: 'search_value',
        sort: ArticleSortField.VIEWS,
        type: ArticleType.SCIENCE,
      });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      const result = await thunk.callThunk(searchParams);

      expect(thunk.dispatch).toHaveBeenCalledTimes(8);

      expect(articlesPageActions.initState).toHaveBeenCalled();

      expect(fetchArticlesList).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('set order param', async () => {
      const searchParams = new URLSearchParams({ order: 'desc' });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setOrder).toHaveBeenCalledWith('desc');
    });

    test('set search param', async () => {
      const searchParams = new URLSearchParams({ search: 'search_value' });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setSearch).toHaveBeenCalledWith('search_value');
    });

    test('set sort param', async () => {
      const searchParams = new URLSearchParams({ sort: ArticleSortField.VIEWS });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setSort).toHaveBeenCalledWith('views');
    });

    test('set type param', async () => {
      const searchParams = new URLSearchParams({ type: ArticleType.ECONOMICS });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setType).toHaveBeenCalledWith('ECONOMICS');
    });

    test('no params', async () => {
      const searchParams = new URLSearchParams({});

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(thunk.dispatch).toHaveBeenCalledTimes(4);

      expect(articlesPageActions.setOrder).not.toHaveBeenCalled();
      expect(articlesPageActions.setSearch).not.toHaveBeenCalled();
      expect(articlesPageActions.setSort).not.toHaveBeenCalled();
      expect(articlesPageActions.setType).not.toHaveBeenCalled();

      expect(articlesPageActions.initState).toHaveBeenCalled();

      expect(fetchArticlesList).toHaveBeenCalled();
    });
  });

  describe('inactive', () => {
    test('not called', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: true,
        },
      };

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(articlesPageActions.initState).not.toHaveBeenCalled();

      expect(fetchArticlesList).not.toHaveBeenCalled();
    });
  });
});
