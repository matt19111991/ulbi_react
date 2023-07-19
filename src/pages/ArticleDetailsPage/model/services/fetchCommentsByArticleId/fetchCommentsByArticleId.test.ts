import { Article } from 'entities/Article';
import { Comment } from 'entities/Comment';

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const articleId: Article['id'] = '1';

const comments: Comment[] = [
  {
    id: '1',
    text: 'Ortum tandem ducunt ad teres ignigena. Peritus, grandis amors cito contactus de teres, placidus galatae.',
    user: {
      id: '1',
      username: 'Jack',
    },
  },
  {
    id: '2',
    text: 'Talis valebat satis imitaris fluctus est. A falsis, racana clemens mons.',
    user: {
      id: '2',
      username: 'Mary',
    },
  },
];

describe('fetchCommentsByArticleId', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));

    const result = await thunk.callThunk(articleId);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(comments);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(articleId);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });

  test('no article id error', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.post).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});
