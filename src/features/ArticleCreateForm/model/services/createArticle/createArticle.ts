import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Article } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

// eslint-disable-next-line path-checker-1911/layer-imports
import { articlesPageActions } from '@/pages/ArticlesPage'; // импорт со страницы как исключение

import type { CreateArticleForm } from '../../types/createArticleFormSchema';

export const createArticle = createAsyncThunk<
  Article, // возвращаемое значение
  CreateArticleForm, // на вход передаем форму
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articleForm/createArticle', async (form, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    if (!form.title) {
      return thunkApi.rejectWithValue('No title in provided form');
    }

    const state = thunkApi.getState();

    const userData = getUserAuthData(state);

    if (!userData) {
      return thunkApi.rejectWithValue('No user data');
    }

    const newArticleData: CreateArticleForm & { userId: Article['user']['id'] } = {
      ...form,
      userId: userData.id,
    };

    /*
      'axios.post<Article>' => типизация возвращаемого значения с сервера

       в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
      'app/providers/StoreProvider/config/store.ts'

       вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
      'thunkApi.extra.api.post === axios.post'
   */
    const response = await thunkApi.extra.api.post<{ article: Article }>(
      'articles',
      newArticleData,
    );

    if (!response.data) {
      return thunkApi.rejectWithValue('No article data');
    }

    const createdArticle = response.data.article;

    const { createdAt, id, user, views } = createdArticle;

    const articleToStore = { ...form, createdAt, id, user, views };

    thunkApi.dispatch(articlesPageActions.addArticleToTheList(articleToStore));

    return createdArticle;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
