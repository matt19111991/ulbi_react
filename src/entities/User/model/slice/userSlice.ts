import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';

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
    },

    // достаем сохраненные данные о пользователе из localStorage (на случай закрытия вкладки)
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (user) {
        const parsedUser = JSON.parse(user) as User;

        state.authData = parsedUser;

        // выставляем 'feature flags' для пользователя, чтобы отображать или скрывать функционал
        setFeatureFlags(parsedUser.features);
      }

      state.mounted = true;
    },
    logout: (state) => {
      state.authData = undefined;

      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
