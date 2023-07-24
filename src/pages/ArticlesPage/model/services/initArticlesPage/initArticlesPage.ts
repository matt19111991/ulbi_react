import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { ArticleSortField } from 'entities/Article';

import { SortOrder } from 'shared/types/sort';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkApi) => {
    const state = thunkApi.getState();

    const inited = getArticlesPageInited(state);

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const searchFromUrl = searchParams.get('search');
      const sortFromUrl = searchParams.get('sort') as ArticleSortField;

      if (orderFromUrl) {
        thunkApi.dispatch(articlesPageActions.setOrder(orderFromUrl));
      }

      if (searchFromUrl) {
        thunkApi.dispatch(articlesPageActions.setSearch(searchFromUrl));
      }

      if (sortFromUrl) {
        thunkApi.dispatch(articlesPageActions.setSort(sortFromUrl));
      }

      // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
      thunkApi.dispatch(articlesPageActions.initState());

      thunkApi.dispatch(fetchArticlesList());
    }
  },
);
