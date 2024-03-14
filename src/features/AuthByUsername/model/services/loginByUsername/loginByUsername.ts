import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosRequestConfig } from 'axios';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { userActions } from '@/entities/User';
import type { User } from '@/entities/User';

export interface LoginByUsernameProps {
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
        - объект 'payload': '{ password, username }'
        - объект 'thunkApi'
*/

// 1-ый вызов 'dispatch-а': 'loginByUsername();'
export const loginByUsername = createAsyncThunk<
  User, // ЧТО_ВЕРНЕТСЯ_ИЗ_РЕСПОНСА_ТИП
  LoginByUsernameProps, // ЧТО_ПРИНИМАЕТ_ФУНКЦИЯ_ТИП
  ThunkConfig<string> // THUNK_КОНФИГ_ТИП
  /*
    type THUNK_КОНФИГ_ТИП = {
      state?: unknown       // => можно указывать схему для хранилища
      dispatch?: Dispatch
      extra?: unknown       // => можно расширять 'extra' дополнительными свойствами и методами
      rejectValue?: unknown // => можно задавать свои собственные типы для ошибки
      serializedErrorType?: unknown
      pendingMeta?: unknown
      fulfilledMeta?: unknown
      rejectedMeta?: unknown
    }
  */
>('login/loginByUsername', async (authData, thunkApi) => {
  try {
    /*
      обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
   */

    // иначе 403 ошибка 'AUTH ERROR'
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: true,
      },
    };

    /*
      'axios.post<User>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
      'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
      'thunkApi.extra.api.post === axios.post'
    */

    const response = await thunkApi.extra.api.post<User>('/login', authData, axiosConfig);

    if (!response.data) {
      return thunkApi.rejectWithValue('No user data');
    }

    // 2-ой вызов 'dispatch-а'
    thunkApi.dispatch(userActions.setAuthData(response.data));

    // 3-ий вызов 'dispatch-а': 'thunkApi.fulfillWithValue(response.data)'
    return response.data; // аналог: 'thunkApi.fulfillWithValue(response.data);'
  } catch (e) {
    /*
      здесь переводы можно использовать только импортировав 'i18n' напрямую:
        "import i18n from '@/shared/config/i18n/i18n';"

      использование:
        "return thunkApi.rejectWithValue(i18n.t('Ошибка при попытке входа'));"
   */

    // 2-ой вызов 'dispatch-а'
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
