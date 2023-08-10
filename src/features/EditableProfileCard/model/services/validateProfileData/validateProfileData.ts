import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

// можно еще провалидировать через 'async thunk', который через 'getState()' достает данные профиля из 'state'

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }

  const {
    age,
    avatar,
    city,
    country,
    currency,
    first,
    lastname,
    username,
  } = profile;

  const errors: ValidateProfileError[] = [];

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!avatar) {
    errors.push(ValidateProfileError.INCORRECT_AVATAR);
  }

  if (!city) {
    errors.push(ValidateProfileError.INCORRECT_CITY);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  if (!currency) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY);
  }

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (!username) {
    errors.push(ValidateProfileError.INCORRECT_USERNAME);
  }

  return errors;
};
