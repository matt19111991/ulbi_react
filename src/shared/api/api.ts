import axios from 'axios';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__,
});

/*
  перед каждым запросом будем запускать 'interceptor' и добавлять заголовок 'Authorization';
  если оставить добавление заголовка в 'axios.create' => 'headers':
  на сервер могут отправляться пустые значения заголовка 'Authorization'

  '$api?.interceptors' нужно сделать опциональными, иначе ошибка:
  "TypeError: Cannot read properties of undefined (reading 'interceptors')"
*/
$api?.interceptors.request.use((config) => {
  // не передаем 'Authorization' заголовок для '/login' эндпоинта
  if (config.headers && config.url !== '/login') {
    // проверяется только наличие заголовка
    config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }

  return config;
});
