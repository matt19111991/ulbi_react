import type { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'Error',
      },
    };

    expect(getLoginError(state as StateSchema)).toBe('Error');
  });

  test('should work with empty state', () => {
    const state = {};

    expect(getLoginError(state as StateSchema)).toBeUndefined();
  });
});
