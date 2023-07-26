import { Article, ArticleType } from 'entities/Article';

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticleRecommendations } from './fetchArticleRecommendations';

const articles: Article[] = [
  {
    id: '1',
    blocks: [],
    createdAt: '26.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в JS за 2023 год?',
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
  {
    id: '3',
    blocks: [],
    createdAt: '11.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в JS за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 446,
  },
  {
    id: '4',
    blocks: [],
    createdAt: '29.02.2023',
    img: 'https://w7.pngwing.com/pngs/234/329/png-transparent-python-logo-thumbnail.png',
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 132,
  },
];

describe('fetchArticleRecommendations', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchArticleRecommendations);

    thunk.api.get.mockReturnValue(Promise.resolve({ data: articles }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
      params: {
        _limit: 4,
      },
    });

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(articles);
    expect(result.payload).toHaveLength(4);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchArticleRecommendations);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
