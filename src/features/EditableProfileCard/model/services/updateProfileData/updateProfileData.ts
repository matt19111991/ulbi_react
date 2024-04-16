import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  // '_' - заглушка (ничего не передаем при вызове updateProfileData()
  try {
    // в 'async thunks' можно использовать 'thunkApi.getState()'
    const formData = getProfileForm(thunkApi.getState());

    const errors = validateProfileData(formData);

    // валидация не прошла
    if (errors.length) {
      return thunkApi.rejectWithValue(errors);
    }

    const response = await thunkApi.extra.api.put(`profile/${formData?.id}`, formData);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
