import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleView } from '@/entities/Article/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slice/articlesPageSlice');

describe('fetchNextArticlesPage', () => {
  describe('success', () => {
    test('set next page and fetch list', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          areLoading: false,
          entities: {},
          hasMore: true,
          ids: [],
          limit: 4,
          page: 2,
          view: ArticleView.LIST,
        },
      };

      const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(4);

      expect(articlesPageActions.setPage).toHaveBeenCalledWith(state.articlesPage!.page! + 1);

      expect(fetchArticlesList).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('fulfilled');
    });
  });

  describe('inactive', () => {
    test("hasn't more", async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          areLoading: false,
          entities: {},
          hasMore: false,
          ids: [],
          limit: 4,
          page: 2,
          view: ArticleView.LIST,
        },
      };

      const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

      await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(articlesPageActions.setPage).not.toHaveBeenCalled();

      expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test('are loading', async () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          areLoading: true,
          entities: {},
          hasMore: true,
          ids: [],
          limit: 4,
          page: 2,
          view: ArticleView.LIST,
        },
      };

      const thunk = new TestAsyncThunk(fetchNextArticlesPage, state);

      await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(articlesPageActions.setPage).not.toHaveBeenCalled();

      expect(fetchArticlesList).not.toHaveBeenCalled();
    });
  });
});
