import type { Action } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import type { LoginByUsernameProps } from '../services/loginByUsername/loginByUsername';

import type { LoginSchema } from '../types/loginSchema';

import { loginActions, loginReducer } from './loginSlice';

/*
   expect(...).toBe();    => для сравнения примитивов
   expect(...).toEqual(); => для сравнения вложенных структур (объектов)
*/

describe('loginSlice', () => {
  describe('sync actions', () => {
    test('test set username', () => {
      const state: DeepPartial<LoginSchema> = {};

      const reducer = loginReducer(state as LoginSchema, loginActions.setUsername('Jack'));

      // 'expect(reducer).toBe({ username: 'Jack' });' => Ошибка 'Received: serializes to the same string'
      expect(reducer).toEqual({ username: 'Jack' });
    });

    test('test set password', () => {
      const state: DeepPartial<LoginSchema> = {};

      const reducer = loginReducer(state as LoginSchema, loginActions.setPassword('123'));

      expect(reducer).toEqual({ password: '123' });
    });
  });

  describe('async loginByUsername action', () => {
    test('test set is loading', () => {
      const state: DeepPartial<LoginSchema> = {
        error: 'Login error',
        isLoading: false,
      };

      const reducer = loginReducer(state as LoginSchema, loginByUsername.pending as Action);

      expect(reducer).toEqual({ error: undefined, isLoading: true });
    });

    test('test set is fulfilled', () => {
      const state: DeepPartial<LoginSchema> = {
        isLoading: true,
      };

      const reducer = loginReducer(state as LoginSchema, loginByUsername.fulfilled as Action);

      expect(reducer).toEqual({ isLoading: false });
    });

    test('test set is rejected', () => {
      // значения не важны, экшен 'loginByUsername.rejected()' требует передачи 3-его аргумента
      const args: LoginByUsernameProps = {
        password: '123',
        username: 'Jack',
      };

      const errorMessage = 'Jest test error';

      const error = new Error(errorMessage);

      const state: DeepPartial<LoginSchema> = {
        error: undefined,
        isLoading: true,
      };

      /*
        при тестировании 'extraReducers':
          - второй аргумент: любая строка (например, 'requestId')
          - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'LoginByUsernameProps'
       */
      const reducer = loginReducer(
        state as LoginSchema,
        loginByUsername.rejected(error, 'requestId', args) as Action,
      );

      expect(reducer).toEqual({ error: errorMessage, isLoading: false });
    });
  });
});
