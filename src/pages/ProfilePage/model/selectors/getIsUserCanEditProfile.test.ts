import { StateSchema } from 'app/providers/StoreProvider';

import { getIsUserCanEditProfile } from './getIsUserCanEditProfile';

describe('getIsUserCanEditProfile', () => {
  test("should return true if this is the current user's profile", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          id: '1',
          username: 'admin',
        },
      },
      user: {
        authData: {
          id: '1',
          username: 'admin',
        },
      },
    };

    expect(getIsUserCanEditProfile(state as StateSchema)).toBeTruthy();
  });

  test("should return false if this is not the current user's profile", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          id: '1',
          username: 'admin',
        },
      },
      user: {
        authData: {
          id: '2',
          username: 'user',
        },
      },
    };

    expect(getIsUserCanEditProfile(state as StateSchema)).toBeFalsy();
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {},
      user: {},
    };

    expect(getIsUserCanEditProfile(state as StateSchema)).toBeFalsy();
  });
});
