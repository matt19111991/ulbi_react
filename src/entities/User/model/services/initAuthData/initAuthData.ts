import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { LAST_DESIGN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { getUserDataByIdQuery } from '../../../api/userApi';

import type { User } from '../../types/user';

export const initAuthData = createAsyncThunk<
  User, // возвращаемое значение
  void, // нет передаваемых аргументов
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('user/initAuthData', async (_, thunkApi) => {
  /*
    обязательно нужно возвращать что-то из функции, иначе:
      - в состоянии 'fulfilled' не будет 'payload' поля
      - состояние 'rejected' не вызовется (ошибочно отработает состояние 'fulfilled')
   */
  try {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return thunkApi.rejectWithValue('No stored user');
    }

    // 'unwrap' - чтобы был доступ только к 'payload' данным, а не ко всему объекту 'async thunk'
    const response = await thunkApi.dispatch(getUserDataByIdQuery(userId))?.unwrap();

    localStorage.setItem(
      LAST_DESIGN_LOCALSTORAGE_KEY,
      response?.features?.isAppRedesigned ? 'new' : 'old',
    );

    return response;
  } catch (e) {
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
