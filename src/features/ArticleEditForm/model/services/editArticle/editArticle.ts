import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const editArticle = createAsyncThunk<Article, Article, ThunkConfig<string>>(
  'articleForm/editArticle',
  async (form, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const userData = getUserAuthData(state);

      if (!userData || !form.title) {
        return thunkApi.rejectWithValue('no data');
      }

      const updatedArticleData = {
        ...form,
        userId: userData.id,
      };

      const response = await thunkApi.extra.api.put<Article>(
        `/articles/${form.id}`,
        updatedArticleData,
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
