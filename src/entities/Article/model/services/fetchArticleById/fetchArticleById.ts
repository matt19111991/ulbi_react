import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  Article, // возвращаемое значение
  Article['id'], // на вход передаем 'ID' статьи
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articleDetails/fetchArticleById', async (articleId, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    if (!articleId) {
      return thunkApi.rejectWithValue('No provided article ID');
    }

    const response = await thunkApi.extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: 'user', // получаем весь 'user' объект из БД
      },
    });

    if (!response.data) {
      return thunkApi.rejectWithValue('No article data');
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
