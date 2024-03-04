import type { StateSchema } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import type { JsonSettings } from '../../types/jsonSettings';

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

const newJsonSettingsArgs: JsonSettings = {
  theme: Theme.DARK,
};

const unwrappedResult: Record<string, JsonSettings> = {
  jsonSettings: newJsonSettingsArgs,
};

describe('saveJsonSettings', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(saveJsonSettings, userState, unwrappedResult);

    const result = await thunk.callThunk(newJsonSettingsArgs);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(unwrappedResult.jsonSettings);
  });

  test('error no user data', async () => {
    const noUserDataState: DeepPartial<StateSchema> = {
      user: {
        authData: undefined,
      },
    };

    const thunk = new TestAsyncThunk(saveJsonSettings, noUserDataState);

    const result = await thunk.callThunk(newJsonSettingsArgs);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });

  test('error no provided JSON settings', async () => {
    const incorrectUnwrappedResult: Record<string, JsonSettings> = {
      invalid: newJsonSettingsArgs,
    };

    const thunk = new TestAsyncThunk(saveJsonSettings, userState, incorrectUnwrappedResult);

    const result = await thunk.callThunk(newJsonSettingsArgs);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No provided JSON settings');
  });
});
