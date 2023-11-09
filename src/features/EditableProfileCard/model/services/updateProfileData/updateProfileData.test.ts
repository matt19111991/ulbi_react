import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ValidateProfileError } from '../../consts/consts';

import { updateProfileData } from './updateProfileData';

const updateFormData = {
  id: '1',
  age: 22,
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  lastname: 'Smith',
  username: 'admin',
};

const initialState: DeepPartial<StateSchema> = {
  profile: {
    form: updateFormData,
  },
};

describe('updateProfileData', () => {
  test('success update profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, initialState);

    thunk.api.put.mockReturnValue(Promise.resolve({ data: updateFormData }));

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toBe(updateFormData);
  });

  test('error update profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, initialState);

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test('validate error profile data', async () => {
    const inValidatedState = {
      ...initialState,
      profile: {
        ...initialState.profile,
        form: {
          ...initialState.profile?.form,
          lastname: '',
        },
      },
    };

    const thunk = new TestAsyncThunk(updateProfileData, inValidatedState);

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
