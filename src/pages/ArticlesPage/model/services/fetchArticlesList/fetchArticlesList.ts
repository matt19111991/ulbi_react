import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { ArticleType } from '@/entities/Article';
import type { Article } from '@/entities/Article';

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
    'replace === false' => 'articlesAdapter.addMany':
      - новая порция данных подгружается в конец, используем для ленивой загрузки

    'replace === true' => 'articlesAdapter.setAll':
      - полностью новая порция данных, используем для фильтров
  */
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[], // возвращаемое значение
  /*
    на вход передаем значение для 'replace', будем использовать это значение в слайсах,
    в текущем 'async thunk' не используем
  */
  FetchArticlesListProps | undefined,
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
  const state = thunkApi.getState();

  const limit = getArticlesPageLimit(state);
  const order = getArticlesPageOrder(state);
  const page = getArticlesPageNumber(state);
  const search = getArticlesPageSearch(state);
  const sort = getArticlesPageSort(state);
  const type = getArticlesPageType(state);

  /*
    обязательно нужно возвращать что-то из функции, иначе состояния 'fulfilled' и 'rejected'
    не вызовутся (зависнет состояние 'pending') в обоих случаях
  */
  try {
    // добавляем параметры строки запроса в 'URL'
    addQueryParams({
      order,
      search,
      sort,
      type,
    });

    /*
     'axios.get<Article[]>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
     'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
     'thunkApi.extra.api.get === axios.get'
    */
    const response = await thunkApi.extra.api.get<Article[]>('articles', {
      /*
       'query' параметры, подробнее:
        https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#relationships
      */
      params: {
        // полнотекстовый поиск (по всему содержимому 'json-server/db.json')
        q: search,

        // отправляем 'undefined', если хотим отменить фильтрацию по типу
        type: type === ArticleType.ALL ? undefined : type,

        // получаем весь 'user' объект из БД, чтобы отрисовывать аватар, когда статьи в режиме 'ArticleView.List'
        _expand: 'user',

        _limit: limit,
        _order: order,
        _page: page,
        _sort: sort,
      },
    });

    if (!response.data) {
      return thunkApi.rejectWithValue('No articles data');
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
