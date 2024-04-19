import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article, ArticleType } from '@/entities/Article';

import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

import {
  getArticlesPageLimit,
  getArticlesPageNumber,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  /*
    replace === false => articlesAdapter.addMany:
      - новая порция данных подгружается в конец; для ленивой загрузки

    replace === true => articlesAdapter.setAll:
    - полностью новая порция данных; для фильтров
  */

  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps | undefined,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
  // не используем здесь 'replace' напрямую
  const state = thunkApi.getState();

  const limit = getArticlesPageLimit(state);
  const order = getArticlesPageOrder(state);
  const page = getArticlesPageNumber(state);
  const search = getArticlesPageSearch(state);
  const sort = getArticlesPageSort(state);
  const type = getArticlesPageType(state);

  try {
    // добавляем параметры строки запроса в 'URL'
    addQueryParams({
      order,
      search,
      sort,
      type,
    });

    const response = await thunkApi.extra.api.get<Article[]>('articles', {
      params: {
        q: search,

        // отправляем 'undefined', если хотим отменить фильтрацию по типу
        type: type === ArticleType.ALL ? undefined : type,

        _expand: 'user', // чтобы отрисовывать аватар пользователя для статьи (ArticleView.List)
        _limit: limit,
        _order: order,
        _page: page,
        _sort: sort,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue('error');
  }
});
