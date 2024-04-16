import type { Article } from '@/entities/Article/testing';
import type { Comment } from '@/entities/Comment/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const articleId: Article['id'] = '1';

const comments: Comment[] = [
  {
    id: '1',
    text: 'Or tum tandem duct ad teres signage. Emeritus, grands amours city contactus de teres, placidus galatae.',
    user: {
      id: '1',
      username: 'Jack',
    },
  },
  {
    id: '2',
    text: 'Talis valebat satis imitaris fluctuates est. A falsis, racana clemens mons.',
    user: {
      id: '2',
      username: 'Mary',
    },
  },
];

describe('fetchCommentsByArticleId', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));

    const result = await thunk.callThunk(articleId);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalledWith('comments', {
      params: {
        articleId: '1',
        _expand: 'user',
      },
    });

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(comments);
  });

  test('error no comments data', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(articleId);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No comments data');
  });

  test('error no provided article ID', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

    // некорректные данные: ничего не передаем аргументами в 'thunk.callThunk()', чтобы вызвать ошибку
    const result = await thunk.callThunk();

    expect(thunk.api.get).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No provided article ID');
  });
});
