import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

import { Comment } from 'entities/Comment';

import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

/* Для комментариев используем НОРМАЛИЗАЦИЮ ДАННЫХ:

   Вместо массива комментариев будем использовать:
    - объект (ключ - id комментария, значение - сам комментарий)
    - массив айдишников комментариев (для ссылок на сами комментарии)

   Эта оптимизация позволяет (например, при обновлении одного комментария):
    - не итерироваться по всему списку комментариев и по итогу менять всего один комментарий,
      а менять точечно по ключу один комментарий

    - избежать дублирования данных в Redux store / локально:
      'comment', 'editedComment', 'draftComment', 'onModerationComment'

    - сложность не O(n), а O(1);
*/

// адаптер с настройками для нормализации данных
const commentsAdapter = createEntityAdapter<Comment>({
  /* если уникальное значение комментария будет не 'id', а 'commentId':
     selectId: (comment) => comment.commentId, */

  /* массив с айдишниками будет отсортирован на основе поля 'title':
     sortComparer: (a, b) => a.title.localeCompare(b.title), */
});

// селектор для части стейта, которую хотим нормализовать
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);

const initialState: ArticleDetailsCommentsSchema = {
  error: undefined,
  entities: {},
  ids: [],
  isLoading: false,
};

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(initialState),
  reducers: {},
});

export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
