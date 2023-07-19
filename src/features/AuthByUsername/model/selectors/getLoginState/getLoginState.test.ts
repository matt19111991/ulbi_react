import { StateSchema } from 'app/providers/StoreProvider';

import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
  test('should return state', () => {
    const loginForm = {
      password: '123123',
      username: 'user',
    };

    const state: DeepPartial<StateSchema> = { loginForm };

    expect(getLoginState(state as StateSchema)).toEqual(loginForm);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginState(state as StateSchema)).toBe(undefined);
  });
});
