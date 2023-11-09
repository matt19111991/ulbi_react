import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article/testing';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slice/articlesPageSlice');

describe('initArticlesPage', () => {
  describe('success', () => {
    test('all params', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({
        order: 'asc',
        search: 'search_value',
        sort: ArticleSortField.CREATED,
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
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({ order: 'asc' });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setOrder).toHaveBeenCalled();
      expect(articlesPageActions.setOrder).toHaveBeenCalledWith('asc');
    });

    test('set search param', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({ search: 'search_value' });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setSearch).toHaveBeenCalled();
      expect(articlesPageActions.setSearch).toHaveBeenCalledWith('search_value');
    });

    test('set sort param', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({ sort: ArticleSortField.CREATED });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setSort).toHaveBeenCalled();
      expect(articlesPageActions.setSort).toHaveBeenCalledWith('createdAt');
    });

    test('set type param', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({ type: ArticleType.ECONOMICS });

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(articlesPageActions.setType).toHaveBeenCalled();
      expect(articlesPageActions.setType).toHaveBeenCalledWith('ECONOMICS');
    });

    test('no params', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: false,
        },
      };

      const searchParams = new URLSearchParams({});

      const thunk = new TestAsyncThunk(initArticlesPage, state);

      await thunk.callThunk(searchParams);

      expect(thunk.dispatch).toHaveBeenCalledTimes(4);
      expect(articlesPageActions.setOrder).not.toHaveBeenCalled();
      expect(articlesPageActions.setSearch).not.toHaveBeenCalled();
      expect(articlesPageActions.setSort).not.toHaveBeenCalled();
      expect(articlesPageActions.setType).not.toHaveBeenCalled();
      expect(fetchArticlesList).toHaveBeenCalled();
    });
  });

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
