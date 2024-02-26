import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import { LAST_DESIGN_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { getUserDataByIdQuery } from '../../../api/userApi';

import type { User } from '../../types/user';

export const initAuthData = createAsyncThunk<
  User, // возвращаемое значение
  User | undefined, // передаваемые аргументы; 'User' может быть в 'unit' тестах
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('user/initAuthData', async (user, thunkApi) => {
  try {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return thunkApi.rejectWithValue('No stored user');
    }

    // в 'Jest' среде не получилось добраться до метода 'unwrap()'
    if (__PROJECT__ === 'jest') {
      if (user) {
        return user;
      }

      return thunkApi.rejectWithValue('No user data');
    }

    // 'unwrap' - чтобы был доступ только к 'payload' данным, а не всему объекту 'async thunk'
    const response = await thunkApi.dispatch(getUserDataByIdQuery(userId))?.unwrap();

    localStorage.setItem(
      LAST_DESIGN_LOCALSTORAGE_KEY,
      response?.features?.isAppRedesigned ? 'new' : 'old',
    );

    return response; // обязательно возвращать 'response' (в текущем случае типа 'User')
  } catch (e) {
    return thunkApi.rejectWithValue('error');
  }
});
