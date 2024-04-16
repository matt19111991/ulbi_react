import type { Action } from '@reduxjs/toolkit';

import type { Comment } from '@/entities/Comment/testing';

import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import type { ArticleDetailsCommentsSchema } from '../../types/ArticleDetailsCommentsSchema';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

const comments: Comment[] = [
  {
    id: '1',
    text: 'Or tum tandem duct ad teres signage. Emeritus, grandis amours city contactus de teres, placidus galatae.',
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

const normalizedEntities: Record<Comment['id'], Comment> = {
  [comments[0].id]: comments[0],
  [comments[1].id]: comments[1],
};

const normalizedIds: Array<Comment['id']> = [comments[0].id, comments[1].id];

describe('articleDetailsCommentsSlice', () => {
  describe('fetchCommentsByArticleId', () => {
    test('test set is pending', () => {
      const state: DeepPartial<ArticleDetailsCommentsSchema> = {
        areLoading: false,
        error: 'Fetch comments error',
      };

      const reducer = articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.pending as Action,
      );

      expect(reducer).toEqual({ areLoading: true, error: undefined });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<ArticleDetailsCommentsSchema> = {
        areLoading: true,
      };

      /*
        при тестировании 'extraReducers' обязательно нужно передавать:
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае "Article['id']"
      */
      const reducer = articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.fulfilled(comments, 'requestId', '1'),
      );

      expect(reducer).toEqual({
        areLoading: false,
        entities: normalizedEntities,
        ids: normalizedIds,
      });
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<ArticleDetailsCommentsSchema> = {
        areLoading: true,
        error: undefined,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае "Article['id']"
      */
      const reducer = articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.rejected(error, 'requestId', '1'),
      );

      expect(reducer).toEqual({ areLoading: false, error: errorMessage });
    });
  });
});
