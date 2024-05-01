import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

// тип экшенов для 'rejected' состояний у 'extraReducers'
export type ErrorAction<T = string | undefined> = PayloadAction<
  T, // 'action payload' => строковое сообщение об ошибке или 'undefined' по умолчанию
  string, // 'action type'
  // 'meta' информация
  {
    // аргументы, передаваемые в 'async thunk' при вызове,
    arg: unknown; // их можно прокинуть через 'generic': 'ErrorAction<T, K>' и использовать: 'arg: K'
    aborted: boolean;
    condition: boolean;
    rejectedWithValue: boolean;
    requestId: string;
    requestStatus: 'rejected';
  },
  SerializedError // тип для объекта с ошибкой
>;
