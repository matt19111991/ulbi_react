import { Country, Currency } from 'shared/const/common';

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
  isLoading: boolean;
  readonly: boolean;
}
