import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Profile } from '../../types/Profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
  async (_, thunkAPI) => { // '_' - ничего не передаем в запрос
      try {
        const response = await thunkAPI.extra.api.get<Profile>('/profile');

        if (!response.data) {
          throw new Error();
        }

        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue('error');
      }
    },
);
