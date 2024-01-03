import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

/*
  Костыль, чтобы избавиться от ошибки : "Unexpected key [reducerKey] found in previous state
  received by the reducer. Expected to find one of the known reducer keys instead: 'counter',
  'pageScroll', 'user', 'api'. Unexpected keys will be ignored."
*/

export const combineSlicesAvoidErrorMessageMiddleware: Middleware = (api) => (next) => (action) => {
  // eslint-disable-next-line no-console
  const consoleErrorFunc = console.error;

  /*
    используем 'unknownAction', чтобы избежать несоответствия типов:
      - у типа 'Middleware': тип 'action' - это 'unknown'
      - чтобы использовать 'action.type' вместо 'unknown' должен быть тип 'UnknownAction'
  */
  const unknownAction = action as UnknownAction;

  if (unknownAction.type === '@DESTROY profile reducer') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error = undefined;

    return next(unknownAction);
  }

  // eslint-disable-next-line no-console
  console.error = consoleErrorFunc;

  return next(unknownAction);
};
