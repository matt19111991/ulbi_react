import { generateArticles } from '@/shared/lib/generators/articles';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticleRecommendations } from './fetchArticleRecommendations';

const articles = generateArticles(4);

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
