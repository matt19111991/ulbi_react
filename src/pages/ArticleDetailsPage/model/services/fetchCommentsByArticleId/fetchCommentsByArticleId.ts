import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, thunkApi) => {
    if (!articleId) {
      return thunkApi.rejectWithValue('error');
    }

    try {
      const response = await thunkApi.extra.api.get<Comment[]>('/comments', {
        params: { // query параметры
//        подробнее: https://www.npmjs.com/package/json-server#relationships

/*        через поле 'articleId' у комментария ссылаемся на родителя для комментария и
          получаем список всех комментариев для статьи с 'articleId'
*/        articleId,
          _expand: 'user', // получаем весь 'user' объект
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
