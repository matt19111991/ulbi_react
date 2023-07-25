import { ActionCreatorWithPayload, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from 'entities/Article';

import { SortOrder } from 'shared/types/sort';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

const setSearchParam = <T>(
  param: T,
  action: ActionCreatorWithPayload<T>,
  dispatch: Dispatch,
): void => {
  if (param) {
    dispatch(action(param));
  }
};

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
      const typeFromUrl = searchParams.get('type') as ArticleType;

      setSearchParam(orderFromUrl, articlesPageActions.setOrder, thunkApi.dispatch);
      setSearchParam(searchFromUrl as string, articlesPageActions.setSearch, thunkApi.dispatch);
      setSearchParam(sortFromUrl, articlesPageActions.setSort, thunkApi.dispatch);
      setSearchParam(typeFromUrl, articlesPageActions.setType, thunkApi.dispatch);

      // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
      thunkApi.dispatch(articlesPageActions.initState());

      thunkApi.dispatch(fetchArticlesList());
    }
  },
);
