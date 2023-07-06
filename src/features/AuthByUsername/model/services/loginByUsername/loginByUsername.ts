import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

import { User } from 'entities/User';

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

      return response.data; // аналог: thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
