import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import {
  getArticlesPageAreLoading,
  getArticlesPageHasMore,
  getArticlesPageNumber,
} from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slice/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const state = thunkApi.getState();

    const areLoading = getArticlesPageAreLoading(state);
    const hasMore = getArticlesPageHasMore(state);
    const page = getArticlesPageNumber(state);

    if (hasMore && !areLoading) {
      const nextPage = page + 1;

      thunkApi.dispatch(articlesPageActions.setPage(nextPage));

      thunkApi.dispatch(fetchArticlesList());
    }
  },
);
