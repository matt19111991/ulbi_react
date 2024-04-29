import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import type { ProfileSchema } from '../../types/editableProfileCardSchema';

import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData', () => {
  const profileData: ProfileSchema['data'] = {
    age: 22,
    avatar:
      'https://ik.imagekit.io/ably/ghost/prod/2023/12/choosing-the-best-javascript-frameworks-for-your-next-project.png?tr=w-1728,q-50',
    city: 'New-York',
    country: Country.USA,
    currency: Currency.USD,
    first: 'Jack',
    id: '1',
    lastname: 'Smith',
    username: 'admin',
  };

  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ data: profileData }));

    const result = await thunk.callThunk(profileData.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalledWith(`profile/${profileData.id}`);

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(profileData);
  });

  test('error no profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    // указываем, что должно вернуться из 'get' запроса
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk(profileData.id);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No profile data');
  });
});
