import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../../api/userApi';

import { getJsonSettings } from '../../selectors/getUserJsonSettings/getUserJsonSettings';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';

import type { JsonSettings } from '../../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings, // на выходе
  JsonSettings, // на входе
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
  /*
   обязательно нужно возвращать что-то из функции, иначе:
     - в состоянии 'fulfilled' не будет 'payload' поля
     - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
  */
  try {
    const userData = getUserAuthData(thunkApi.getState());

    if (!userData) {
      return thunkApi.rejectWithValue('No user data');
    }

    const currentSettings = getJsonSettings(thunkApi.getState());

    const response = await thunkApi
      .dispatch(
        setJsonSettingsMutation({
          jsonSettings: {
            ...currentSettings,
            ...newJsonSettings,
          },
          userId: userData.id,
        }),
      )
      ?.unwrap(); // чтобы был доступ только к 'payload' данным, а не ко всему объекту 'async thunk'

    if (!response.jsonSettings) {
      return thunkApi.rejectWithValue('No provided JSON settings');
    }

    return response.jsonSettings;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
