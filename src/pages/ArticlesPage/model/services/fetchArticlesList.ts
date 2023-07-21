import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Article } from 'entities/Article';

import { getArticlesPageLimit } from '../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async ({ page = 1 }, thunkApi) => {
    const limit = getArticlesPageLimit(thunkApi.getState());

    try {
      const response = await thunkApi.extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user', // чтобы отрисовывать аватар пользователя для статьи (ArticleView.List)
          _limit: limit,
          _page: page,
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
