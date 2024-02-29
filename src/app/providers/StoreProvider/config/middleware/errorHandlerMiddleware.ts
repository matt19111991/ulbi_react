import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { toast } from 'react-hot-toast';

interface ErrorAction extends UnknownAction {
  payload: string;
}

export const errorHandlerMiddleware: Middleware = (api) => (next) => (action) => {
  /*
    используем 'unknownAction', чтобы избежать несоответствия типов:
      - у типа 'Middleware': тип 'action' - это 'unknown'
      - чтобы использовать 'action.payload' вместо 'unknown': должен быть тип 'ErrorAction'
  */
  const unknownAction = action as ErrorAction;

  if (isRejectedWithValue(action)) {
    toast.error(unknownAction.payload, {
      id: unknownAction.payload, // избавляемся от дубликатов
    });
  }

  return next(action);
};
