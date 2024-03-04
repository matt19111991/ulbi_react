import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { LAST_DESIGN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { setFeatureFlags } from '@/shared/lib/features';

import { initAuthData } from '../services/initAuthData/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';

import type { JsonSettings } from '../types/jsonSettings';
import type { User, UserSchema } from '../types/user';

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

      // сохраняем 'id' текущего пользователя в хранилище
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);

      if (action.payload.jsonSettings?.theme) {
        // инициализируем тему, сохраненную для пользователя
        document.body.className = action.payload.jsonSettings?.theme;
      }

      // сохраняем выбранный дизайн для текущего пользователя в хранилище
      localStorage.setItem(
        LAST_DESIGN_LOCALSTORAGE_KEY,
        action.payload.features?.isAppRedesigned ? 'new' : 'old',
      );
    },

    logout: (state) => {
      state.authData = undefined;

      // сбрасываем 'feature flags'
      setFeatureFlags({});

      // сбрасываем пользовательскую тему
      document.body.className = Theme.LIGHT;

      // очищаем 'localStorage'
      localStorage.removeItem(LAST_DESIGN_LOCALSTORAGE_KEY);
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);

      // перезагружаем страницу
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
      state.authData = action.payload;

      // выставляем 'feature flags' для пользователя, чтобы отображать или скрывать функционал
      setFeatureFlags(action.payload?.features);

      if (action.payload?.jsonSettings?.theme) {
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
