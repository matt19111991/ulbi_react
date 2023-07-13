import { Currency } from 'entities/Currency';

import { Country } from 'shared/const/common';

export interface Profile {
  age?: number;
  avatar?: string;
  city?: string;
  country?: Country;
  currency?: Currency;
  first?: string;
  lastname?: string;
  username?: string;
}

export interface ProfileSchema {
  data?: Profile;
  error?: string;
  form?: Profile; // изменения пользователя после получения 'data' с сервера
  isLoading: boolean;
  readonly: boolean;
}
