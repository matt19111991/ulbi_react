import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticleDetailsData } from 'entities/Article';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';

import { getAddCommentFormText } from '../selectors/addCommentFormSelectors';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
  'addCommentForm/sendComment',
  async (_, thunkApi) => {
//  '_' - заглушка, ничего не передаем в sendComment() при вызове
    try {
      const state = thunkApi.getState();

      const article = getArticleDetailsData(state);
      const commentFormText = getAddCommentFormText(state);
      const userData = getUserAuthData(state);

      if (!userData || !article || !commentFormText) {
        return thunkApi.rejectWithValue('no data');
      }

      const newCommentData = {
        articleId: article.id,
        text: commentFormText,
        userId: userData.id,
      };

      const response = await thunkApi.extra.api.post<Comment>('/comments', newCommentData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
