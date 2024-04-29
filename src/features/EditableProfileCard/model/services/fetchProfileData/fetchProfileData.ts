import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
  Profile, // возвращаемое значение
  Profile['id'], // на вход передаем 'id' профиля
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('profile/fetchProfileData', async (profileId, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    /*
     'axios.get<Profile>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
     'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
     'thunkApi.extra.api.get === axios.get'
    */
    const response = await thunkApi.extra.api.get<Profile>(`profile/${profileId}`);

    if (!response.data) {
      return thunkApi.rejectWithValue('No profile data');
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
