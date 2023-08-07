import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { ValidateProfileError } from '../../consts/consts';

import { validateProfileData } from './validateProfileData';

describe('validateProfileData', () => {
  test('all fields are correct', () => {
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

    expect(validateProfileData(profileData)).toEqual([]);
  });

  test('no profile data', () => {
    expect(validateProfileData(undefined)).toEqual([
      ValidateProfileError.NO_DATA,
    ]);
  });

  test('no first and last name', () => {
    const profileData = {
      age: 22,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: '',
      lastname: '',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', () => {
    const profileData = {
      age: 0,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });

  test('incorrect avatar', () => {
    const profileData = {
      age: 22,
      avatar: '',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_AVATAR,
    ]);
  });

  test('incorrect city', () => {
    const profileData = {
      age: 22,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: '',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_CITY,
    ]);
  });

  test('incorrect country', () => {
    const profileData = {
      age: 22,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: undefined,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test('incorrect currency', () => {
    const profileData = {
      age: 22,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: undefined,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_CURRENCY,
    ]);
  });

  test('incorrect username', () => {
    const profileData = {
      age: 22,
      avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: '',
    };

    expect(validateProfileData(profileData)).toEqual([
      ValidateProfileError.INCORRECT_USERNAME,
    ]);
  });

  test('incorrect all', () => {
    const profileData = {};

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
