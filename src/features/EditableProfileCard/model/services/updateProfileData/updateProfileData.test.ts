import type { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { TestAsyncThunk } from '@/shared/lib/tests';

import { ValidateProfileError } from '../../consts/consts';

import type { ProfileSchema } from '../../types/editableProfileCardSchema';

import { updateProfileData } from './updateProfileData';

const updateFormData: ProfileSchema['form'] = {
  age: 22,
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  id: '1',
  lastname: 'Smith',
  username: 'admin',
};

const state: DeepPartial<StateSchema> = {
  profile: {
    form: updateFormData,
  },
};

describe('updateProfileData', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, state);

    // указываем, что должно вернуться из 'put' запроса
    thunk.api.put.mockReturnValue(Promise.resolve({ data: updateFormData }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalledWith(`profile/${updateFormData.id}`, updateFormData);

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toBe(updateFormData);
  });

  test('error no profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, state);

    // указываем, что должно вернуться из 'put' запроса
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).toHaveBeenCalledWith(`profile/${updateFormData.id}`, updateFormData);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toEqual([ValidateProfileError.NO_DATA]);
  });

  test('error profile data validation', async () => {
    const invalidatedState: DeepPartial<StateSchema> = {
      ...state,
      profile: {
        ...state.profile,
        form: {
          ...state.profile?.form,
          lastname: '',
        },
      },
    };

    const thunk = new TestAsyncThunk(updateProfileData, invalidatedState);

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.put).not.toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
