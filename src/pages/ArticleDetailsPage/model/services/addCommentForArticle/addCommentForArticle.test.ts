import { StateSchema } from '@/app/providers/StoreProvider';

import { Comment } from '@/entities/Comment/testing';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { addCommentForArticle } from './addCommentForArticle';

const comment: Comment = {
  id: '1',
  text: 'Ortum tandem ducunt ad teres ignigena. Peritus, grandis amors cito contactus de teres, placidus galatae.',
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

    thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(comment);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, initialState);

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(comment.text);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no data error', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle);

    const result = await thunk.callThunk(comment.text);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
