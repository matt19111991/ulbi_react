import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

import { Profile } from '../../types/Profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    try {
      // в 'async thunks' можно использовать 'thunkAPI.getState()'
      const formData = getProfileForm(thunkAPI.getState());

      const response = await thunkAPI.extra.api.put('/profile', formData);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);
