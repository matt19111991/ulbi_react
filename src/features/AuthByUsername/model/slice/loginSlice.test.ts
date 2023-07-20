import { loginByUsername } from '../services/loginByUsername/loginByUsername';

import { LoginSchema } from '../types/loginSchema';

import { loginActions, loginReducer } from './loginSlice';

/*
   expect(...).toBe();    => для сравнения примитивов
   expect(...).toEqual(); => для сравнения вложенных структур (объектов)
*/

describe('loginSlice', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = {};

    const reducer = loginReducer(state as LoginSchema, loginActions.setUsername('Jack'));

    // expect(reducer).toBe({ username: 'Jack' }); => Ошибка 'Received: serializes to the same string'
    expect(reducer).toEqual({ username: 'Jack' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = {};

    const reducer = loginReducer(state as LoginSchema, loginActions.setPassword('123'));

    expect(reducer).toEqual({ password: '123' });
  });

  test('test set is loading', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: false,
    };

    const reducer = loginReducer(state as LoginSchema, loginByUsername.pending);

    expect(reducer).toEqual({ isLoading: true });
  });

  test('test set is fulfilled', () => {
    const state: DeepPartial<LoginSchema> = {
      isLoading: true,
    };

    const reducer = loginReducer(state as LoginSchema, loginByUsername.fulfilled);

    expect(reducer).toEqual({ isLoading: false });
  });
});
