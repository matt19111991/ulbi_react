import {
  LAST_DESIGN_LOCALSTORAGE_KEY,
  THEME_LOCALSTORAGE_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';

import { getRouteMain } from '@/shared/const/router';
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
    setFeatureFlags({});

    window.localStorage.clear();
  });

  // взято из интернета
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        reload: jest.fn(),
        replace: jest.fn(),
      },
    });
  });

  // взято из интернета
  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: 'original',
    });
  });

  describe('setAuthData', () => {
    test('test set auth data', () => {
      const state: DeepPartial<UserSchema> = {};

      const reducer = userReducer(state as UserSchema, userActions.setAuthData(authData));

      expect(reducer).toEqual({ authData });

      expect(getAllFeatureFlags()).toEqual(authData.features);

      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(authData.id);

      expect(document.body).toHaveClass(authData?.jsonSettings?.theme as Theme);

      expect(window.localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY)).toBe('old');

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout', () => {
    test('test logout', () => {
      window.localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, 'new');
      window.localStorage.setItem(THEME_LOCALSTORAGE_KEY, authData.jsonSettings?.theme as Theme);
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData.id));

      const state: DeepPartial<UserSchema> = { authData };

      const reducer = userReducer(state as UserSchema, userActions.logout());

      expect(reducer).toEqual({ authData: undefined });

      expect(window.localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY)).toBe('new');
      expect(window.localStorage.getItem(THEME_LOCALSTORAGE_KEY)).toBeNull();
      expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();

      expect(window.location.replace).toHaveBeenCalledWith(getRouteMain());
      expect(window.location.replace).toHaveBeenCalledTimes(1);
    });
  });

  describe('initAuthData', () => {
    test('test set fulfilled', () => {
      const state: DeepPartial<UserSchema> = { authData: {}, mounted: false };

      // при тестировании 'extraReducers' вторым аргументом нужно передавать любую строку (например, 'requestId')
      const reducer = userReducer(
        state as UserSchema,
        initAuthData.fulfilled(authData, 'requestId'),
      );

      expect(reducer).toEqual({ authData, mounted: true });

      expect(getAllFeatureFlags()).toEqual(authData.features);

      expect(document.body).toHaveClass(authData.jsonSettings?.theme as Theme);
    });

    test('test set rejected', () => {
      const state: DeepPartial<UserSchema> = { authData: {}, mounted: false };

      // при тестировании 'extraReducers' вторым аргументом нужно передавать любую строку (например, 'requestId')
      const reducer = userReducer(
        state as UserSchema,
        initAuthData.rejected(new Error('Jest test error'), 'requestId'),
      );

      expect(reducer).toEqual({ authData: {}, mounted: true });
    });
  });

  describe('saveJsonSettings', () => {
    test('test set fulfilled', () => {
      const state: DeepPartial<UserSchema> = { authData, mounted: true };

      const newJsonSettings = { theme: Theme.DARK };

      /*
        при тестировании 'extraReducers' обязательно нужно передавать:
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'JsonSettings'
      */
      const reducer = userReducer(
        state as UserSchema,
        saveJsonSettings.fulfilled(newJsonSettings, 'requestId', newJsonSettings),
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
