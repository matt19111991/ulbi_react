import type { StateSchema } from '@/app/providers/StoreProvider';

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

const authorizedState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('createArticle', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(createArticle, authorizedState);

    // указываем, что должно вернуться из 'post' запроса
    thunk.api.post.mockReturnValue(Promise.resolve({ data: form }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalledWith('articles', {
      ...form,
      userId: authorizedState.user?.authData?.id,
    });

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(form);
  });

  test('error no title in provided form', async () => {
    const thunk = new TestAsyncThunk(createArticle);

    const formWithEmptyTitle = {
      ...form,
      title: '',
    };

    const result = await thunk.callThunk(formWithEmptyTitle);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No title in provided form');
  });

  test('error no user data', async () => {
    const notAuthorizedState: DeepPartial<StateSchema> = {
      user: {},
    };

    const thunk = new TestAsyncThunk(createArticle, notAuthorizedState);

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });

  test('error no article data', async () => {
    const thunk = new TestAsyncThunk(createArticle, authorizedState);

    // указываем, что должно вернуться из 'post' запроса
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No article data');
  });
});
