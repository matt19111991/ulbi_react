import type { Action } from '@reduxjs/toolkit';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { ValidateProfileError } from '../consts/consts';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

import type { ProfileSchema } from '../types/editableProfileCardSchema';

import { profileActions, profileReducer } from './profileSlice';

const profileData: ProfileSchema['data'] = {
  age: 22,
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  id: '1',
  lastname: 'Smith',
  username: 'admin',
};

describe('profileSlice', () => {
  describe('sync actions', () => {
    test('test cancel edit', () => {
      const state: DeepPartial<ProfileSchema> = {
        data: profileData,
        form: {
          ...profileData,
          first: 'John',
          lastname: 'Johnson',
        },
        readonly: false,
        validateErrors: [ValidateProfileError.INCORRECT_USER_DATA],
      };

      const reducer = profileReducer(state as ProfileSchema, profileActions.cancelEdit());

      expect(reducer).toEqual({
        data: profileData,
        form: profileData,
        readonly: true,
        validateErrors: undefined,
      });
    });

    test('test set readonly', () => {
      const state: DeepPartial<ProfileSchema> = {
        readonly: false,
      };

      const reducer = profileReducer(state as ProfileSchema, profileActions.setReadOnly(true));

      expect(reducer).toEqual({ readonly: true });
    });

    test('test update profile', () => {
      const state: DeepPartial<ProfileSchema> = {
        form: profileData,
      };

      const updatedFields: DeepPartial<ProfileSchema['form']> = {
        first: 'John',
        lastname: 'Johnson',
      };

      const reducer = profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile(updatedFields),
      );

      expect(reducer).toEqual({
        form: {
          ...profileData,
          ...updatedFields,
        },
      });
    });
  });

  describe('async fetchProfileData action', () => {
    test('test set is pending', () => {
      const state: DeepPartial<ProfileSchema> = {
        error: 'Profile error',
        isLoading: false,
      };

      const reducer = profileReducer(state as ProfileSchema, fetchProfileData.pending as Action);

      expect(reducer).toEqual({
        error: undefined,
        isLoading: true,
      });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'id' профиля
      */
      const reducer = profileReducer(
        state as ProfileSchema,
        fetchProfileData.fulfilled(profileData, 'requestId', profileData.id),
      );

      expect(reducer).toEqual({
        data: profileData,
        form: profileData,
        isLoading: false,
      });
    });

    test('test set is rejected', () => {
      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<ProfileSchema> = {
        error: undefined,
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'id' профиля
      */
      const reducer = profileReducer(
        state as ProfileSchema,
        fetchProfileData.rejected(error, 'requestId', profileData.id),
      );

      expect(reducer).toEqual({ error: errorMessage, isLoading: false });
    });
  });

  describe('async updateProfileData action', () => {
    test('test set is pending', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: false,
        validateErrors: [ValidateProfileError.SERVER_ERROR],
      };

      const reducer = profileReducer(state as ProfileSchema, updateProfileData.pending as Action);

      expect(reducer).toEqual({
        isLoading: true,
        validateErrors: undefined,
      });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'undefined' (ничего не передаем)
      */
      const reducer = profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(profileData, 'requestId', undefined),
      );

      expect(reducer).toEqual({
        data: profileData,
        form: profileData,
        isLoading: false,
        readonly: true,
        validateErrors: undefined,
      });
    });

    test('test set is rejected', () => {
      const errorMessage = ValidateProfileError.NO_DATA;

      const error = new Error(errorMessage);

      const state: DeepPartial<ProfileSchema> = {
        isLoading: true,
        validateErrors: undefined,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'undefined' (ничего не передаем)
          - четвертый аргумент: передаваемый тип ошибки в конфиг: 'ValidateProfileError[]'
      */
      const reducer = profileReducer(
        state as ProfileSchema,
        updateProfileData.rejected(error, 'requestId', undefined, [errorMessage]),
      );

      expect(reducer).toEqual({
        isLoading: false,
        validateErrors: [errorMessage],
      });
    });
  });
});
