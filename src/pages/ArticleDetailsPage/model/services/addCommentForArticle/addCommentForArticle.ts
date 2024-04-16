import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { getArticleDetailsData } from '@/entities/Article';
import type { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (commentFormText, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const article = getArticleDetailsData(state);
      const userData = getUserAuthData(state);

      if (!userData || !article || !commentFormText) {
        return thunkApi.rejectWithValue('no data');
      }

      const newCommentData = {
        articleId: article.id,
        text: commentFormText,
        userId: userData.id,
      };

      const response = await thunkApi.extra.api.post<Comment>('comments', newCommentData);

      if (!response.data) {
        throw new Error();
      }

      // вместо запроса на получение обновленной статьи, можно добавлять созданный комментарий,
      // который вернулся в респонсе, в список уже существующих комментариев

      thunkApi.dispatch(fetchCommentsByArticleId(article.id));

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
