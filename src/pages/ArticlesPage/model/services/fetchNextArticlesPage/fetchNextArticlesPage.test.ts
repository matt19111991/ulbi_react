import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleView } from '@/entities/Article/testing';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage', () => {
  test('success', async () => {
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
    expect(fetchArticlesList).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  describe('not called', () => {
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
      expect(fetchArticlesList).not.toHaveBeenCalled();
    });
  });
});
