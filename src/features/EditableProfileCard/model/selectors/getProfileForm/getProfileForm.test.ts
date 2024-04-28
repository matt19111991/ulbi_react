import type { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import type { ProfileSchema } from '../../types/editableProfileCardSchema';

import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
  test('should return form', () => {
    const form: ProfileSchema['form'] = {
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
      profile: { form },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toBeUndefined();
  });
});
