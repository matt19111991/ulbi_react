import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile, // возвращаемое значение
  undefined, // на вход ничего не передаем
  ThunkConfig<ValidateProfileError[]> // передаваемый тип ошибки в конфиг: 'ValidateProfileError[]'
>('profile/updateProfileData', async (_, thunkApi) => {
  /*
   '_' - заглушка (ничего не передаем при вызове 'updateProfileData()'

    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    // в 'async thunks' можно использовать 'thunkApi.getState()'
    const formData = getProfileForm(thunkApi.getState());

    const errors = validateProfileData(formData);

    // валидация не прошла
    if (errors.length) {
      return thunkApi.rejectWithValue(errors);
    }

    /*
     'axios.put<Profile>' => типизация возвращаемого значения с сервера

      в 'thunkApi' в 'extraArgument' можно записать любые данные, инстансы и т.д. через 'middleware':
     'app/providers/StoreProvider/config/store.ts'

      вызываем вместо базового 'axios' свой кастомный инстанс 'api' (axios):
     'thunkApi.extra.api.put === axios.put'
    */
    const response = await thunkApi.extra.api.put<Profile>(`profile/${formData?.id}`, formData);

    if (!response.data) {
      return thunkApi.rejectWithValue([ValidateProfileError.NO_DATA]);
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
