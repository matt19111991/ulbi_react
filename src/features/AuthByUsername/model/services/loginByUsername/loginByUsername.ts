import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

interface LoginByUsernameProps {
  password: string;
  username: string;
}

/*
  'createAsyncThunk' принимает на вход 2 параметра:
     - тип: 'login/loginByUsername'. Сгенерируется 3 'action types':
        - 'pending'  : 'login/loginByUsername/pending'
        - 'fulfilled': 'login/loginByUsername/fulfilled'
        - 'rejected' : 'login/loginByUsername/rejected'

     - асинхронную функцию 'payloadCreator', которая принимает на вход 2 параметра:
        - payload ({ password,  username })
        - объект 'thunkAPI'
*/

// 1-ый вызов 'dispatch-а': 'loginByUsername();'
export const loginByUsername = createAsyncThunk<
  User, // ЧТО_ВЕРНЕТСЯ_ИЗ_РЕСПОНСА_ТИП
  LoginByUsernameProps, // ЧТО_ПРИНИМАЕТ_ФУНКЦИЯ_ТИП
  ThunkConfig<string> // THUNK_КОНФИГ_ТИП

  /*
    type THUNK_КОНФИГ_ТИП = {
      state?: unknown
      dispatch?: Dispatch
      extra?: unknown       // => можно расширять 'extra' дополнительными свойствами и методами
      rejectValue?: unknown // => можно задавать свои собственные типы для ошибки
      serializedErrorType?: unknown
      pendingMeta?: unknown
      fulfilledMeta?: unknown
      rejectedMeta?: unknown
    }
  */
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: true,
      },
    };

    /*
      axios.post<User> => типизация возвращаемого значения с сервера

      в 'thunkAPI' в 'extraArgument' можно записать любые данные, инстансы и т.д. через middleware:
      'app/providers/StoreProvider/config/store.js'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
      thunkAPI.extra.api.post === axios.post
    */

    const response = await thunkAPI.extra.api.post<User>('/login', authData, axiosConfig);

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    // 2-ой вызов 'dispatch-а'
    thunkAPI.dispatch(userActions.setAuthData(response.data));

    // 3-ий вызов 'dispatch-а': 'thunkAPI.fulfillWithValue(response.data)'
    return response.data; // аналог: thunkAPI.fulfillWithValue(response.data);
  } catch (e) {
    // здесь переводы можно использовать только импортировав 'i18n' напрямую:
    // "import i18n from 'shared/config/i18n/i18n';"

    return thunkAPI.rejectWithValue('error'); // 2-ой вызов 'dispatch-а'
  }
});
