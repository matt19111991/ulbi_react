import axios from 'axios';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
  baseURL: __API__,
});

/*
  перед каждым запросом будем запускать 'interceptor' и добавлять заголовок для авторизации;
  если оставить добавление заголовка в 'axios.create' => на сервере могут отправляться пустые
  значения заголовка 'Authorization'
*/
$api.interceptors.request.use((config) => {
  if (config.headers) {
    // проверяется только наличие заголовка
    config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }

  return config;
});
