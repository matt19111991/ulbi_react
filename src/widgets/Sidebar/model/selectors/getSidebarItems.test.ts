import { StateSchema } from '@/app/providers/StoreProvider';

import { getSidebarItems } from './getSidebarItems';

describe('getSidebarItems', () => {
  test('should return 4 elements for authorized user', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          id: '1',
          username: 'admin',
        },
      },
    };

    expect(getSidebarItems(state as StateSchema)).toHaveLength(4);
  });

  test('should return 2 elements for unauthorized user', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };

    expect(getSidebarItems(state as StateSchema)).toHaveLength(2);
  });
});
