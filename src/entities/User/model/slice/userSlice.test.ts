import { LAST_DESIGN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { getAllFeatureFlags, setFeatureFlags } from '@/shared/lib/features';

import { initAuthData } from '../services/initAuthData/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';

import type { User, UserSchema } from '../types/user';

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
    window.localStorage.clear();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        reload: jest.fn(),
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: 'original',
    });
  });

  describe('setAuthData', () => {
    test('test set auth data', () => {
      const state: DeepPartial<UserSchema> = {};

      expect(userReducer(state as UserSchema, userActions.setAuthData(authData))).toEqual({
        authData,
      });

      expect(getAllFeatureFlags()).toEqual(authData.features);

      expect(window.localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY)).toBe('old');

      expect(document.body).toHaveClass(authData?.jsonSettings?.theme as Theme);

      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(authData.id);
    });
  });

  describe('logout', () => {
    test('test logout', () => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData.id));

      window.localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, 'old');

      const state: DeepPartial<UserSchema> = {
        authData,
      };

      setFeatureFlags(authData.features);

      expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
        authData: undefined,
      });

      expect(getAllFeatureFlags()).toEqual({});

      expect(document.body).toHaveClass(Theme.LIGHT);

      expect(window.localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY)).toBeNull();

      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  describe('initAuthData', () => {
    test('test set fulfilled', () => {
      const state: DeepPartial<UserSchema> = { authData: {}, mounted: false };

      const reducer = userReducer(state as UserSchema, initAuthData.fulfilled(authData, ''));

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
