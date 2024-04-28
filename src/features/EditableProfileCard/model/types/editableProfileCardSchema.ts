import type { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../consts/consts';

export interface ProfileSchema {
  data?: Profile;
  error?: string;
  form?: Profile; // изменения пользователя после получения 'data' с сервера
  isLoading: boolean;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}
