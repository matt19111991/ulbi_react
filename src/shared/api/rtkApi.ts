import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,

    // выставляем заголовки по умолчанию
    prepareHeaders: (headers, api) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

      // проверяем только наличие заголовка и не передаем 'Authorization' заголовок для 'login' эндпоинта
      if (token && api.endpoint !== 'login') {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: () => ({}), // все эндпоинты будем подгружать динамически по необходимости
});
