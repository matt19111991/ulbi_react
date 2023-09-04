import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { initAuthData } from '../services/initAuthData/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';

import { User, UserSchema } from '../types/user';

import { userActions, userReducer } from './userSlice';

const authData: User = {
  id: '1',
  features: {
    isArticleRatingEnabled: true,
  },
  jsonSettings: {
    theme: Theme.ORANGE,
  },
  username: 'Jack',
};

describe('userSlice', () => {
  beforeEach(() => {
    // чтобы использовать 'localStorage' в './config/jest/setupTests' './jestLocalStorage' файл
    window.localStorage.clear();
  });

  describe('setAuthData', () => {
    test('test set auth data', () => {
      const state: DeepPartial<UserSchema> = {};

      expect(userReducer(state as UserSchema, userActions.setAuthData(authData))).toEqual({
        authData,
      });

      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(authData.id);
    });
  });

  describe('logout', () => {
    test('test logout', () => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData.id));

      const state: DeepPartial<UserSchema> = {
        authData,
      };

      expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
        authData: undefined,
      });

      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(undefined);
    });
  });

  describe('initAuthData', () => {
    test('test set fulfilled', () => {
      const state: DeepPartial<UserSchema> = { authData: {}, mounted: false };

      const reducer = userReducer(
        state as UserSchema,
        initAuthData.fulfilled(authData, '', authData),
      );

      expect(reducer).toEqual({ authData, mounted: true });
    });

    test('test set rejected', () => {
      const state: DeepPartial<UserSchema> = { authData: {}, mounted: false };

      const reducer = userReducer(
        state as UserSchema,
        initAuthData.rejected(new Error(''), '', undefined),
      );

      expect(reducer).toEqual({ authData: {}, mounted: true });
    });
  });

  describe('saveJsonSettings', () => {
    test('test set fulfilled', () => {
      const state: DeepPartial<UserSchema> = { authData, mounted: true };

      const newJsonSettings = { theme: Theme.DARK };

      const reducer = userReducer(
        state as UserSchema,
        saveJsonSettings.fulfilled(newJsonSettings, '', newJsonSettings),
      );

      expect(reducer).toEqual({
        authData: {
          ...authData,
          jsonSettings: {
            ...authData.jsonSettings,
            ...newJsonSettings,
          },
        },
        mounted: true,
      });
    });
  });
});
