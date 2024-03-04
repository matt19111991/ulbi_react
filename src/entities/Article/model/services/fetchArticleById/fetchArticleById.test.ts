import { TestAsyncThunk } from '@/shared/lib/tests';

import { article } from '@/shared/lib/generators/articles';

import { fetchArticleById } from './fetchArticleById';

describe('fetchArticleById', () => {
  test('success fetch article by id', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    thunk.api.get.mockReturnValue(Promise.resolve({ data: article }));

    const result = await thunk.callThunk(article.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(article);
  });

  test('error fetch article by id', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(article.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no article id error', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.get).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
