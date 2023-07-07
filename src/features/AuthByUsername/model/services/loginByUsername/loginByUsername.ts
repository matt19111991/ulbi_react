import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

import { User, userActions } from 'entities/User';

import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
  password: string;
  username: string;
}

/* 'createAsyncThunk' принимает на вход 2 параметра:

   - тип: 'login/loginByUsername'. Сгенерируется 3 'action types':
      - 'pending'  : 'login/loginByUsername/pending'
      - 'fulfilled': 'login/loginByUsername/fulfilled'
      - 'rejected' : 'login/loginByUsername/rejected'

   - асинхронную функцию 'payloadCreator', которая принимает на вход 2 параметра:
      - payload ({ password,  username })
      - объект 'thunkAPI'
*/

export const loginByUsername = createAsyncThunk<
  User,                     // ЧТО_ВЕРНЕТСЯ_ИЗ_РЕСПОНСА_ТИП
  LoginByUsernameProps,     // ЧТО_ПРИНИМАЕТ_ФУНКЦИЯ_ТИП
  { rejectValue: string }   // THUNK_КОНФИГ_ТИП
/*
  type THUNK_КОНФИГ_ТИП = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown // => можно задавать свои собственные типы для ошибки
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
  }
*/
>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
       const axiosConfig: AxiosRequestConfig = {
           headers: {
               authorization: true,
           },
       };

      // axios.post<User> // => типизация возвращаемого значения с сервера
      const response = await axios.post<User>(
          'http://localhost:8000/login',
          authData,
          axiosConfig,
      );

      if (!response.data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data; // аналог: thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      // здесь переводы можно использовать только импортировав 'i18n' напрямую
      return thunkAPI.rejectWithValue(i18n.t(('Вы ввели неверный логин или пароль')));
    }
  },
);
