import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';

import { profileActions, profileReducer } from './profileSlice';

const profileData = {
  age: 22,
  avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  lastname: 'Smith',
  username: 'admin',
};

describe('profileSlice', () => {
  describe('reducers', () => {
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

      expect(
        profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
      ).toEqual({
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

      expect(
        profileReducer(state as ProfileSchema, profileActions.setReadOnly(true)),
      ).toEqual({ readonly: true });
    });

    test('test update profile', () => {
      const state: DeepPartial<ProfileSchema> = {
        form: profileData,
      };

      const updatedFields = {
        first: 'John',
        lastname: 'Johnson',
      };

      expect(
        profileReducer(state as ProfileSchema, profileActions.updateProfile(updatedFields)),
      ).toEqual({
        form: {
          ...profileData,
          ...updatedFields,
        },
      });
    });
  });

  describe('fetchProfileData', () => {
    test('test service pending', () => {
      const state: DeepPartial<ProfileSchema> = {
        error: 'Error',
        isLoading: false,
      };

      expect(profileReducer(state as ProfileSchema, fetchProfileData.pending))
        .toEqual({
          error: undefined,
          isLoading: true,
        });
    });

    test('test fulfilled', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: true,
      };

      expect(
        profileReducer(state as ProfileSchema, fetchProfileData.fulfilled(profileData, '', '')),
      ).toEqual({
        data: profileData,
        form: profileData,
        isLoading: false,
      });
    });
  });

  describe('updateProfileData', () => {
    test('test service pending', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: false,
        validateErrors: [ValidateProfileError.SERVER_ERROR],
      };

      expect(
        profileReducer(state as ProfileSchema, updateProfileData.pending),
      ).toEqual({
        isLoading: true,
        validateErrors: undefined,
      });
    });

    test('test service fulfilled', () => {
      const state: DeepPartial<ProfileSchema> = {
        isLoading: true,
      };

      expect(
        // второй аргумент в 'updateProfileData.fulfilled' - заглушка
        profileReducer(state as ProfileSchema, updateProfileData.fulfilled(profileData, '')),
      ).toEqual({
        data: profileData,
        form: profileData,
        isLoading: false,
        readonly: true,
        validateErrors: undefined,
      });
    });
  });
});
