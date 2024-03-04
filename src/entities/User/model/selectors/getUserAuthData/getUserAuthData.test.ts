import type { StateSchema } from '@/app/providers/StoreProvider';

import type { User } from '../../types/user';

import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
  test('should return data', () => {
    const authData: User = {
      id: '1',
      username: 'Jack',
    };

    const state: DeepPartial<StateSchema> = {
      user: {
        authData,
        mounted: true,
      },
    };

    expect(getUserAuthData(state as StateSchema)).toEqual(authData);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };

    expect(getUserAuthData(state as StateSchema)).toBeUndefined();
  });
});
