import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

import { validateProfileData } from '../validateProfileData/validateProfileData';

import { Profile, ValidateProfileError } from '../../types/Profile';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    try {
      // в 'async thunks' можно использовать 'thunkAPI.getState()'
      const formData = getProfileForm(thunkAPI.getState());

      const errors = validateProfileData(formData);

      if (errors.length) { // валидация не прошла
        return thunkAPI.rejectWithValue(errors);
      }

      const response = await thunkAPI.extra.api.put('/profile', formData);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  },
);
