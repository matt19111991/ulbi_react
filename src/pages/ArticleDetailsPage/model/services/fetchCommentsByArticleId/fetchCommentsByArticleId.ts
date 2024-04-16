import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Article } from '@/entities/Article';
import type { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[], // возвращаемое значение
  Article['id'] | undefined, // на вход передаем 'ID' статьи
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе состояния 'fulfilled' и 'rejected'
    не вызовутся (зависнет состояние 'pending') в обоих случаях
  */
  try {
    if (!articleId) {
      return thunkApi.rejectWithValue('No provided article ID');
    }

    /*
     'axios.get<Comment[]>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
     'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
     'thunkApi.extra.api.get === axios.get'
    */
    const response = await thunkApi.extra.api.get<Comment[]>('comments', {
      /*
       'query' параметры, подробнее:
        https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#relationships
      */
      params: {
        /*
          у комментариев есть поле 'articleId', через него ссылаемся на родителя для комментариев и
          получаем список всех комментариев для статьи с указанным 'articleId'
        */
        articleId,

        _expand: 'user', // получаем весь 'user' объект из БД
      },
    });

    if (!response.data) {
      return thunkApi.rejectWithValue('No comments data');
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
