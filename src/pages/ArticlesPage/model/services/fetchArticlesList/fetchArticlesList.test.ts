import { StateSchema } from 'app/providers/StoreProvider';

import { Article, ArticleSortField, ArticleType } from 'entities/Article';

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from './fetchArticlesList';

const articles: Article[] = [
  {
    id: '1',
    blocks: [],
    createdAt: '26.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в S за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 1022,
  },
  {
    id: '2',
    blocks: [],
    createdAt: '19.01.2023',
    img: 'https://w7.pngwing.com/pngs/234/329/png-transparent-python-logo-thumbnail.png',
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 845,
  },
];

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
        },
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);
      expect(thunk.api.get).toHaveBeenCalled();

      expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
        params: {
          q: 'search_value',
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
        articlesPage: {
          limit: 4,
        },
      };

      const thunk = new TestAsyncThunk(fetchArticlesList, state);

      thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

      const result = await thunk.callThunk();

      expect(thunk.dispatch).toHaveBeenCalledTimes(2);

      expect(thunk.api.get).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('fulfilled');
      expect(result.payload).toEqual(articles);
    });
  });

  test('error', async () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        limit: 4,
      },
    };

    const thunk = new TestAsyncThunk(fetchArticlesList, state);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
