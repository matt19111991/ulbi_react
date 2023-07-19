import { Comment } from 'entities/Comment';

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

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

const normalizedEntities = {
  1: {
    id: '1',
    text: 'Ortum tandem ducunt ad teres ignigena. Peritus, grandis amors cito contactus de teres, placidus galatae.',
    user: {
      id: '1',
      username: 'Jack',
    },
  },
  2: {
    id: '2',
    text: 'Talis valebat satis imitaris fluctus est. A falsis, racana clemens mons.',
    user: {
      id: '2',
      username: 'Mary',
    },
  },
};

const normalizedIds = ['1', '2'];

describe('articleDetailsCommentsSlice', () => {
  test('test fetch comments by article id pending', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      areLoading: false,
      error: 'Error',
    };

    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.pending,
      ),
    ).toEqual({ areLoading: true, error: undefined });
  });

  test('test fetch comments by article id fulfilled', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      areLoading: true,
    };

    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.fulfilled(comments, '', ''),
      ),
    ).toEqual({
      areLoading: false,
      entities: normalizedEntities,
      ids: normalizedIds,
    });
  });
});
