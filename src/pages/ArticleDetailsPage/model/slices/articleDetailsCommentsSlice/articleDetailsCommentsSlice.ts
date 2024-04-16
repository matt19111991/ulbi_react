import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { StateSchema } from '@/app/providers/StoreProvider';

import type { Comment } from '@/entities/Comment';

import type { ErrorAction } from '@/shared/types/api';

import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import type { ArticleDetailsCommentsSchema } from '../../types/ArticleDetailsCommentsSchema';

/*
  для комментариев используем НОРМАЛИЗАЦИЮ ДАННЫХ:

  вместо массива комментариев будем использовать:
    - объект (ключ - 'id' комментария, значение - сам комментарий)
    - массив айдишников комментариев (для ссылок на сами комментарии)

  эта оптимизация позволяет (например, при обновлении одного комментария):
    - не итерироваться по всему списку комментариев и по итогу менять всего один комментарий,
      а менять точечно по ключу один комментарий

    - избежать дублирования данных в 'Redux store' / локально:
     'comment', 'editedComment', 'draftComment', 'onModerationComment'

    - сложность не 'O(n)', а 'O(1)'
*/

// адаптер с настройками для нормализации данных
const commentsAdapter = createEntityAdapter<Comment>({
  /*
    если уникальное значение у комментария будет не 'id', а 'commentId':
    selectId: (comment) => comment.commentId,

    массив с айдишниками будет отсортирован на основе поля 'title':
    sortComparer: (a, b) => a.title.localeCompare(b.title),
  */
});

// объект с селекторами для части стейта, которую хотим нормализовать
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const initialState: ArticleDetailsCommentsSchema = {
  areLoading: true,
  error: undefined,
  entities: {},
  ids: [],
};

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.areLoading = true;

        state.error = undefined;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.areLoading = false;

        commentsAdapter.setAll(state, action.payload); // адаптер сам установит 'ids' и 'entities'
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action: ErrorAction) => {
        state.areLoading = false;

        state.error = action.error.message;
      }),
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
