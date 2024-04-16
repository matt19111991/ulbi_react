import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { getArticleDetailsData } from '@/entities/Article';
import type { Article } from '@/entities/Article';

import type { Comment } from '@/entities/Comment';

import { getUserAuthData } from '@/entities/User';
import type { User } from '@/entities/User';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment, // возвращаемое значение
  string, // на вход передаем текст комментария
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articleDetails/addCommentForArticle', async (commentFormText, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    if (!commentFormText) {
      return thunkApi.rejectWithValue('No comment text');
    }

    const state = thunkApi.getState();

    const userData = getUserAuthData(state);

    if (!userData) {
      return thunkApi.rejectWithValue('No user data');
    }

    const article = getArticleDetailsData(state);

    if (!article) {
      return thunkApi.rejectWithValue('No article data');
    }

    const newCommentData: Pick<Comment, 'text'> & { articleId: Article['id']; userId: User['id'] } =
      {
        articleId: article.id,
        text: commentFormText,
        userId: userData.id,
      };

    /*
     'axios.post<Comment>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
     'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
     'thunkApi.extra.api.post === axios.post'
    */
    const response = await thunkApi.extra.api.post<Comment>('comments', newCommentData);

    if (!response.data) {
      return thunkApi.rejectWithValue('Comment create error');
    }

    /*
      вместо запроса на получение обновленного списка комментариев для статьи можно добавлять
      созданный комментарий, который вернулся в респонсе, в список уже существующих комментариев
    */

    thunkApi.dispatch(fetchCommentsByArticleId(article.id));

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
