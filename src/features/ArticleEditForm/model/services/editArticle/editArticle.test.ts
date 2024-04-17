import type { StateSchema } from '@/app/providers/StoreProvider';

import { article } from '@/shared/lib/generators/articles';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { editArticle } from './editArticle';

const form = article;

const authorizedState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('editArticle', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(editArticle, authorizedState);

    // указываем, что должно вернуться из 'put' запроса
    thunk.api.put.mockReturnValue(Promise.resolve({ data: form }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalledWith(`/articles/${form.id}`, {
      ...form,
      userId: authorizedState.user?.authData?.id,
    });

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(form);
  });

  test('error no title in provided form', async () => {
    const thunk = new TestAsyncThunk(editArticle);

    const formWithEmptyTitle = {
      ...form,
      title: '',
    };

    const result = await thunk.callThunk(formWithEmptyTitle);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No title in provided form');
  });

  test('error no user data', async () => {
    const notAuthorizedState: DeepPartial<StateSchema> = {
      user: {},
    };

    const thunk = new TestAsyncThunk(editArticle, notAuthorizedState);

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });

  test('error no article data', async () => {
    const thunk = new TestAsyncThunk(editArticle, authorizedState);

    // указываем, что должно вернуться из 'put' запроса
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(form);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No article data');
  });
});
