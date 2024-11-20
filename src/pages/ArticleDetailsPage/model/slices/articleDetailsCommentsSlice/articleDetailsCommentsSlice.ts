import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setGlobalDevModeChecks } from 'reselect';

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

    массив с айдишниками будет отсортирован на основе поля 'text':
    sortComparer: (a, b) => a.text.localeCompare(b.text),
  */
});

// объект с селекторами для части стейта, которую хотим нормализовать
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>((state) => {
  /*
    отключаем предупреждения вида: "An input selector returned a different
    result when passed same arguments. This means your output selector will
    likely run more frequently than intended. Avoid returning a new reference
    inside your input selector, e.g.
      'createSelector(
        [state => state.comments.map(comment => comment.id)],
        commentIds => commentIds.length
      )' при использовании 'createEntityAdapter'

    затем обратно включаем предупреждение после вызова
   'useSelector(getArticleComments.selectAll)' в компоненте:
   'setGlobalDevModeChecks({ inputStabilityCheck: 'always' });'
  */
  setGlobalDevModeChecks({ inputStabilityCheck: 'never' });

  return state.articleDetailsPage?.comments || commentsAdapter.getInitialState();
});

const initialState: ArticleDetailsCommentsSchema = {
  areLoading: true,
  error: undefined,
  entities: {},
  ids: [],
};

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState(initialState),
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
