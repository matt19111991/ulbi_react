import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

// тип экшенов для 'rejected' состояний у 'extraReducers'
export type ErrorAction = PayloadAction<
  string | undefined, // 'action payload' => строковое сообщение об ошибке
  string, // 'action type'
  // 'meta' информация
  {
    // аргументы, передаваемые в 'async thunk' при вызове,
    arg: unknown; // их можно прокинуть через 'generic': 'ErrorAction<T>' и использовать: 'arg: T'
    aborted: boolean;
    condition: boolean;
    rejectedWithValue: boolean;
    requestId: string;
    requestStatus: 'rejected';
  },
  SerializedError // тип для объекта с ошибкой
>;
