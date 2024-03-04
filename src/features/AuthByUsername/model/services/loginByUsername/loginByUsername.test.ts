// import type { AppDispatch, StateSchema } from '@/app/providers/StoreProvider';

import { userActions } from '@/entities/User/testing';
import type { User } from '@/entities/User/testing';

import { /* mockedTypedAxios, */ TestAsyncThunk } from '@/shared/lib/tests';

import { loginByUsername } from './loginByUsername';

/*
  // Использование без 'TestAsyncThunk'

  describe('loginByUsername', () => {
    const dispatch: AppDispatch = jest.fn();

    const getState: () => StateSchema = jest.fn();

    const extra = {
      api: mockedTypedAxios,
      navigate: jest.fn(),
    };

    test('success login', async () => {
      const userValue: User = {
        id: '1',
        username: 'Jack',
      };

      // указываем, что должно вернуться из 'post' запроса
      mockedTypedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

      // 'loginByUsername()' - это 'createAsyncThunk' ('action creator'), возвращает 'action' после вызова
      const action = loginByUsername({ password: '123', username: '123' });

      const result = await action(dispatch, getState, extra);

      // проверяем 2-ой вызов 'dispatch-а' в 'try' ветке
      expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));

      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(mockedTypedAxios.post).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('fulfilled');

      expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
      // указываем, что должно вернуться из 'post' запроса (некорректная структура)
      mockedTypedAxios.post.mockReturnValue(Promise.resolve({ invalid: 'true' }));

      // 'loginByUsername()' - это 'createAsyncThunk' ('action creator'), возвращает 'action' после вызова
      const action = loginByUsername({ password: '123', username: '123' });

      const result = await action(dispatch, getState, extra);

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(mockedTypedAxios.post).toHaveBeenCalled();

      expect(result.meta.requestStatus).toBe('rejected');

      expect(result.payload).toBe('No user data');
    });
  });
*/

// Использование с 'TestAsyncThunk'

describe('loginByUsername', () => {
  test('success login', async () => {
    const userValue: User = {
      id: '1',
      username: 'Jack',
    };

    const thunk = new TestAsyncThunk(loginByUsername);

    // указываем, что должно вернуться из 'post' запроса
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const result = await thunk.callThunk({ password: '123', username: '123' });

    // проверяем 2-ой вызов 'dispatch-а' в 'try' ветке
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toEqual(userValue);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);

    // указываем, что должно вернуться из 'post' запроса (некорректная структура)
    thunk.api.post.mockReturnValue(Promise.resolve({ invalid: 'true' }));

    const result = await thunk.callThunk({ password: '123', username: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.payload).toBe('No user data');
  });
});
