import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';
import { setFeatureFlags } from '@/shared/lib/features';

import { initAuthData } from '../services/initAuthData/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';

import { JsonSettings } from '../types/jsonSettings';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  mounted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // сохраняем данные о пользователе после успешного логина
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;

      // выставляем 'feature flags' для пользователя, чтобы отображать или скрывать функционал
      setFeatureFlags(action.payload.features);

      // сохраняем id текущего пользователя в хранилище
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);

      if (action.payload.jsonSettings?.theme) {
        // инициализируем тему, сохраненную для пользователя
        document.body.className = action.payload.jsonSettings?.theme;
      }
    },

    logout: (state) => {
      state.authData = undefined;

      localStorage.removeItem(USER_LOCALSTORAGE_KEY);

      // сбрасываем пользовательскую тему
      document.body.className = Theme.LIGHT;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
      state.authData = action.payload;

      // выставляем 'feature flags' для пользователя, чтобы отображать или скрывать функционал
      setFeatureFlags(action.payload.features);

      if (action.payload.jsonSettings?.theme) {
        // инициализируем тему, сохраненную для пользователя
        document.body.className = action.payload.jsonSettings?.theme;
      }

      state.mounted = true;
    });

    builder.addCase(initAuthData.rejected, (state) => {
      state.mounted = true;
    });

    builder.addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
      if (state.authData) {
        state.authData.jsonSettings = action.payload;
      }
    });
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
