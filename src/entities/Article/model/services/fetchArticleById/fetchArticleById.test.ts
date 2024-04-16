import { TestAsyncThunk } from '@/shared/lib/tests';

import { article } from '@/shared/lib/generators/articles';

import { fetchArticleById } from './fetchArticleById';

describe('fetchArticleById', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ data: article }));

    const result = await thunk.callThunk(article.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalledWith('articles/1', {
      params: {
        _expand: 'user',
      },
    });

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(article);
  });

  test('error no provided article ID', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    const result = await thunk.callThunk(undefined);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No provided article ID');
  });

  test('error no article data', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(article.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No article data');
  });
});
