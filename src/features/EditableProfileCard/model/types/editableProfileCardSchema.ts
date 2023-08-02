import { Profile } from 'entities/Profile';

export enum ValidateProfileError {
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_AVATAR = 'INCORRECT_AVATAR',
  INCORRECT_CITY = 'INCORRECT_CITY',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_USERNAME = 'INCORRECT_USERNAME',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}

export interface ProfileSchema {
  data?: Profile;
  error?: string;
  form?: Profile; // изменения пользователя после получения 'data' с сервера
  isLoading: boolean;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
