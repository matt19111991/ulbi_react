import type { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123123',
      },
    };

    expect(getLoginPassword(state as StateSchema)).toBe('123123');
  });

  test('should work with empty state and return default value', () => {
    const state = {};

    expect(getLoginPassword(state as StateSchema)).toBe('');
  });
});
