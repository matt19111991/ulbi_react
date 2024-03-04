import { StateSchema } from '@/app/providers/StoreProvider';

import { TestAsyncThunk } from '@/shared/lib/tests';

import type { CreateArticleForm } from '../../types/createArticleFormSchema';

import { createArticle } from './createArticle';

const form: CreateArticleForm = {
  blocks: [],
  img: '',
  subtitle: '',
  title: 'New article title',
  type: [],
};

const initialState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('createArticle', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(createArticle, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ data: form }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(form);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(createArticle, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no data error', async () => {
    const thunk = new TestAsyncThunk(createArticle);

    const result = await thunk.callThunk(form);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
