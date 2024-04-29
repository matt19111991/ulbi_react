import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { ValidateProfileError } from '../../consts/consts';

import type { ProfileSchema } from '../../types/editableProfileCardSchema';

import { validateProfileData } from './validateProfileData';

describe('validateProfileData', () => {
  test('all fields are correct', () => {
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

    expect(validateProfileData(profileData)).toEqual([]);
  });

  test('no profile data', () => {
    expect(validateProfileData()).toEqual([ValidateProfileError.NO_DATA]);
  });

  test('no first name', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: '',
      id: '1',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('no last name', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      id: '1',
      lastname: '',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('age equals 0', () => {
    const profileData: ProfileSchema['data'] = {
      age: 0,
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

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('age is not integer', () => {
    const profileData: ProfileSchema['data'] = {
      age: '22' as unknown as number,
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

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test('incorrect avatar', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar: '',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      id: '1',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_AVATAR]);
  });

  test('incorrect city', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: '',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      id: '1',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_CITY]);
  });

  test('incorrect country', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: undefined,
      currency: Currency.USD,
      first: 'Jack',
      id: '1',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test('incorrect currency', () => {
    const profileData: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: undefined,
      first: 'Jack',
      id: '1',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_CURRENCY]);
  });

  test('incorrect username', () => {
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
      username: '',
    };

    expect(validateProfileData(profileData)).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
  });

  test('incorrect all', () => {
    const profileData: ProfileSchema['data'] = {};

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_AVATAR,
      ValidateProfileError.INCORRECT_CITY,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.INCORRECT_CURRENCY,
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_USERNAME,
    ]);
  });
});
