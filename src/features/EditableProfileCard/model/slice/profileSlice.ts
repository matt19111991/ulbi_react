import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Profile } from '@/entities/Profile';

import type { ErrorAction } from '@/shared/types/api';

import { ValidateProfileError } from '../consts/consts';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

import type { ProfileSchema } from '../types/editableProfileCardSchema';

const initialState: ProfileSchema = {
  data: undefined,
  error: undefined,
  form: undefined,
  isLoading: false,
  readonly: true,
  validateErrors: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.form = state.data;

      state.readonly = true;

      state.validateErrors = undefined;
    },
    setReadOnly: (state, action: PayloadAction<ProfileSchema['readonly']>) => {
      state.readonly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<ProfileSchema['form']>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined;

        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.data = action.payload;

        state.form = action.payload;

        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action: ErrorAction) => {
        state.error = action.error.message;

        state.isLoading = false;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;

        state.validateErrors = undefined;
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.data = action.payload;

        state.form = action.payload;

        state.isLoading = false;

        state.readonly = true;

        state.validateErrors = undefined;
      })
      .addCase(
        updateProfileData.rejected,
        (state, action: PayloadAction<ValidateProfileError[] | undefined>) => {
          state.isLoading = false;

          state.validateErrors = action.payload;
        },
      );
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
