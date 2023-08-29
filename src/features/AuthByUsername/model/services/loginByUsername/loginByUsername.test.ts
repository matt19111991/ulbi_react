// import { Dispatch } from '@reduxjs/toolkit';

// import { StateSchema } from 'app/providers/StoreProvider';

import { userActions } from '@/entities/User';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

/* Использование без TestAsyncThunk

describe('loginByUsername', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('success login', async () => {
    const userValue = {
      id: '1',
      username: 'Jack',
    };

    mockedAxios.post.mockReturnValue(
      Promise.resolve({ data: userValue }),
    );

//  'loginByUsername' это 'createAsyncThunk' (action creator), возвращает 'action' после вызова
    const action = loginByUsername({ password: '123', username: '123' });

    const result = await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(dispatch).toHaveBeenCalledTimes(3);

    expect(mockedAxios.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('error login', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({ status: 403 }),
    );

    const action = loginByUsername({ password: '123', username: '123' });

    const result = await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(mockedAxios.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
*/

// Использование с TestAsyncThunk

describe('loginByUsername', () => {
  test('success login', async () => {
    const userValue = {
      id: '1',
      username: 'Jack',
    };

    const thunk = new TestAsyncThunk(loginByUsername);

    // после вызова 'jest.mock()', метод 'mockReturnValue' добавляется к 'axios'
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const result = await thunk.callThunk({ password: '123', username: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);

    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk({ password: '123', username: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('error');
  });
});
