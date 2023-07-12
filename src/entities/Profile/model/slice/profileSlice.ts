import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

import { Profile, ProfileSchema } from '../types/Profile';

const initialState: ProfileSchema = {
  data: undefined,
  error: undefined,
  isLoading: false,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }),
});

export const { actions: profileActions } = profileSlice;

export const { reducer: profileReducer } = profileSlice;
