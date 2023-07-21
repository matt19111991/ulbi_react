import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (_, thunkApi) => {
    try {
      const response = await thunkApi.extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user', // чтобы отрисовывать аватар пользователя для статьи (ArticleView.List)
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
