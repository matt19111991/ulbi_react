import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';

import { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
  isLoading: false,
  password: '',
  username: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: { // обычные 'reducers' предназначены для обычных синхронных изменений
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => { // 'extraReducers' предназначены для асинхронных изменений (asyncThunk)
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
        // тип у 'action.payload' => 'User'
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.error = action.payload; // тип у 'action.payload' => 'string' (тип 'rejectedValue')
        state.isLoading = false;
      });
  },
});

export const { actions: loginActions } = loginSlice;

export const { reducer: loginReducer } = loginSlice;
