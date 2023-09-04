import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../../api/userApi';

import { getJsonSettings } from '../../selectors/getUserJsonSettings/getUserJsonSettings';
import { getUserAuthData } from '../../selectors/getUserAuthData/getUserAuthData';

import { JsonSettings } from '../../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings, // на выходе
  JsonSettings, // на входе
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
  try {
    const userData = getUserAuthData(thunkApi.getState());

    const currentSettings = getJsonSettings(thunkApi.getState());

    if (!userData) {
      return thunkApi.rejectWithValue('No user data');
    }

    // в 'Jest' среде не получилось добраться до метода 'unwrap()'
    if (__PROJECT__ === 'jest') {
      if (newJsonSettings) {
        return { ...currentSettings, ...newJsonSettings };
      }

      return thunkApi.rejectWithValue('No provided JSON settings');
    }

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
      ?.unwrap(); // чтобы был доступ к данным

    if (!response.jsonSettings) {
      return thunkApi.rejectWithValue('No provided JSON settings');
    }

    return response.jsonSettings;
  } catch (e) {
    return thunkApi.rejectWithValue('error');
  }
});
