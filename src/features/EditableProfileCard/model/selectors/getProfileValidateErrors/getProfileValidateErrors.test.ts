import type { StateSchema } from '@/app/providers/StoreProvider';

import { ValidateProfileError } from '../../consts/consts';

import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors', () => {
  test('should return validate errors', () => {
    const errors = [ValidateProfileError.INCORRECT_AGE, ValidateProfileError.SERVER_ERROR];

    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors,
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileValidateErrors(state as StateSchema)).toBeUndefined();
  });
});
