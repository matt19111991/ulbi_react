import { StateSchema } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { saveJsonSettings } from './saveJsonSettings';

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

describe('saveJsonSettings', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, userState);

    const result = await thunk.callThunk({ theme: Theme.DARK });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual({ theme: Theme.DARK });
  });

  test('error no user data', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, {
      user: {
        authData: undefined,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('No user data');
  });

  test('error no provided json settings', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, userState);

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('No provided JSON settings');
  });
});
