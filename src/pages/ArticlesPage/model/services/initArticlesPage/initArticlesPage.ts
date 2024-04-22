import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import type { AppDispatch, ThunkConfig } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import type { SortOrder } from '@/shared/types/sort';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

const setSearchParam = <T extends SortOrder | string | ArticleSortField | ArticleType>(
  param: T,
  action: ActionCreatorWithPayload<T>,
  dispatch: AppDispatch,
): void => {
  if (param) {
    dispatch(action(param));
  }
};

export const initArticlesPage = createAsyncThunk<
  void, // ничего не возвращаем
  URLSearchParams, // на вход передаем 'searchParams'
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const state = thunkApi.getState();

  /*
    загрузили список статей => перешли на конкретную статью => вернулись обратно к списку =>
    снова началась подгрузка (а должен отобразиться предыдущий загруженный список)
    для того, чтобы отследить этот момент и прекратить ненужную подгрузку, заводим флаг 'inited'
  */
  const inited = getArticlesPageInited(state);

  if (!inited) {
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const searchFromUrl = searchParams.get('search') as string;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const typeFromUrl = searchParams.get('type') as ArticleType;

    const { initState, setOrder, setSearch, setSort, setType } = articlesPageActions;

    const { dispatch } = thunkApi;

    setSearchParam(orderFromUrl, setOrder, dispatch);
    setSearchParam(searchFromUrl, setSearch, dispatch);
    setSearchParam(sortFromUrl, setSort, dispatch);
    setSearchParam(typeFromUrl, setType, dispatch);

    // должно быть раньше запроса, чтобы передать правильный 'limit' в запрос
    dispatch(initState());

    await dispatch(fetchArticlesList());
  }
});
