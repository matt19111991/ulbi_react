import type { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import type { ProfileSchema } from '../../types/editableProfileCardSchema';

import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
  test('should return data', () => {
    const data: ProfileSchema['data'] = {
      age: 22,
      avatar:
        'https://ik.imagekit.io/ably/ghost/prod/2023/12/choosing-the-best-javascript-frameworks-for-your-next-project.png?tr=w-1728,q-50',
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      id: '1',
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    };

    const state: DeepPartial<StateSchema> = {
      profile: { data },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileData(state as StateSchema)).toBeUndefined();
  });
});
