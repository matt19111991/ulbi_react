import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema, updateProfileData, ValidateProfileError } from 'entities/Profile';

import { profileActions, profileReducer } from './profileSlice';

const initialData = {
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
  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data: initialData,
      form: {
        ...initialData,
        first: 'John',
        lastname: 'Johnson',
      },
      readonly: false,
      validateErrors: [ValidateProfileError.INCORRECT_USER_DATA],
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({
      data: initialData,
      form: initialData,
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
      form: initialData,
    };

    const updatedFields = {
      first: 'John',
      lastname: 'Johnson',
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.updateProfile(updatedFields)),
    ).toEqual({
      form: {
        ...initialData,
        ...updatedFields,
      },
    });
  });

  test('test update profile service pending', () => {
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

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      // второй аргумент в 'updateProfileData.fulfilled' - заглушка
      profileReducer(state as ProfileSchema, updateProfileData.fulfilled(initialData, '')),
    ).toEqual({
      data: initialData,
      form: initialData,
      isLoading: false,
      readonly: true,
      validateErrors: undefined,
    });
  });
});
