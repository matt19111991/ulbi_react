import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (_, thunkApi) => {
    const state = thunkApi.getState();

    const inited = getArticlesPageInited(state);

    if (!inited) {
      // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
      thunkApi.dispatch(articlesPageActions.initState());

      thunkApi.dispatch(fetchArticlesList());
    }
  },
);
