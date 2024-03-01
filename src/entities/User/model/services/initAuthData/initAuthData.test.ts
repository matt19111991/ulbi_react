import type { StateSchema } from '@/app/providers/StoreProvider';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { initAuthData } from './initAuthData';

const userState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      jsonSettings: {
        theme: Theme.ORANGE,
      },
      username: 'Jack',
    },
    mounted: true,
  },
};

describe('initAuthData', () => {
  afterEach(() => {
    window.localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  });

  test('success', async () => {
    window.localStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(userState.user?.authData?.id),
    );

    const thunk = new TestAsyncThunk(initAuthData, userState);

    /*
      в 'Jest' среде не получилось добраться до метода 'unwrap()',
      просто проверяем возвращаемый объект из 'async thunk'
    */
    const result = await thunk.callThunk({
      id: '1',
      jsonSettings: {
        theme: Theme.ORANGE,
      },
      username: 'Jack',
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(userState.user?.authData);
  });

  test('error no user data', async () => {
    window.localStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(userState.user?.authData?.id),
    );

    const thunk = new TestAsyncThunk(initAuthData, userState);

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });

  test('error no stored user id', async () => {
    const thunk = new TestAsyncThunk(initAuthData, userState);

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No stored user');
  });
});
