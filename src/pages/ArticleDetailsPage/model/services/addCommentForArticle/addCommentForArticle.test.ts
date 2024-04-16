import type { StateSchema } from '@/app/providers/StoreProvider';

import type { Comment } from '@/entities/Comment/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { addCommentForArticle } from './addCommentForArticle';

const comment: Comment = {
  id: '1',
  text: 'Or tum tandem duct ad teres signage. Emeritus, grands amours city contactus de teres, placidus galatae.',
  user: {
    id: '1',
    username: 'Jack',
  },
};

const initialState: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '1',
    },
  },
  user: {
    authData: {
      id: '1',
    },
  },
};

describe('addCommentForArticle', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, initialState);

    // указываем, что должно вернуться из 'post' запроса
    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(comment);
  });

  test('error comment create', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, initialState);

    // указываем, что должно вернуться из 'post' запроса
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('Comment create error');
  });

  test('error no comment text', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, initialState);

    // некорректные данные: ничего не передаем аргументами в 'thunk.callThunk()', чтобы вызвать ошибку
    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No comment text');
  });

  test('error no user data', async () => {
    const noUserDataState: DeepPartial<StateSchema> = {
      ...initialState,
      user: {},
    };

    // некорректные данные: нет данных о пользователе
    const thunk = new TestAsyncThunk(addCommentForArticle, noUserDataState);

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });

  test('error no article data', async () => {
    const noArticleDataState: DeepPartial<StateSchema> = {
      ...initialState,
      articleDetails: {},
    };

    // некорректные данные: нет данных о статье
    const thunk = new TestAsyncThunk(addCommentForArticle, noArticleDataState);

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No article data');
  });
});
