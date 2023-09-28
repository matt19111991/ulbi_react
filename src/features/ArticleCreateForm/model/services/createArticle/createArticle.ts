import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

import { CreateArticleForm } from '../../types/createArticleFormSchema';

export const createArticle = createAsyncThunk<Article, CreateArticleForm, ThunkConfig<string>>(
  'articleForm/createArticle',
  async (form, thunkApi) => {
    try {
      const state = thunkApi.getState();

      const userData = getUserAuthData(state);

      if (!userData || !form.title) {
        return thunkApi.rejectWithValue('no data');
      }

      const newArticleData = {
        ...form,
        userId: userData.id,
      };

      const response = await thunkApi.extra.api.post<Article>('/articles', newArticleData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('error');
    }
  },
);
