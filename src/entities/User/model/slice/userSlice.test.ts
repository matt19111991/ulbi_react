import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { User, UserSchema } from '../types/user';

import { userActions, userReducer } from './userSlice';

const authData: User = {
  id: '1',
  username: 'Jack',
};

describe('userSlice', () => {
  beforeEach(() => {
    // чтобы использовать 'localStorage' в './config/jest/setupTests' './jestLocalStorage' файл
    window.localStorage.clear();
  });

  test('test set auth data', () => {
    const state: DeepPartial<UserSchema> = {};

    expect(userReducer(state as UserSchema, userActions.setAuthData(authData))).toEqual({
      authData,
    });
  });

  test('test init auth data (user exists in localStorage)', () => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData));

    const state: DeepPartial<UserSchema> = {};

    expect(userReducer(state as UserSchema, userActions.initAuthData())).toEqual({
      authData,
      mounted: true,
    });
  });

  test('test init auth data (no user in localStorage)', () => {
    const state: DeepPartial<UserSchema> = {};

    expect(userReducer(state as UserSchema, userActions.initAuthData())).toEqual({
      authData: undefined,
      mounted: true,
    });
  });

  test('test logout', () => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(authData));

    const state: DeepPartial<UserSchema> = {
      authData,
    };

    expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
      authData: undefined,
    });

    expect(window.localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(undefined);
  });
});
