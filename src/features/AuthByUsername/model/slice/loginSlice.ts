import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';

import type { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
  isLoading: false,
  password: '',
  username: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,

  // 'reducers' предназначены для обычных синхронных изменений ('setPassword', 'setUsername' - это экшены)
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },

  // 'extraReducers' предназначены для асинхронных изменений ('async thunks')
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;

        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false; // тип у 'action.payload' => 'User'
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.error = action.error.message;

        state.isLoading = false;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
