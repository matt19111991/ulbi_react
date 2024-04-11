import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

/*
  Костыль, чтобы избавиться от ошибки при удалении редюсера: "Unexpected key [reducerKey]
  found in previous state received by the reducer. Expected to find one of the known reducer
  keys instead: 'counter', 'pageScroll', 'user', 'api'. Unexpected keys will be ignored."
*/
export const combineSlicesAvoidErrorMessageMiddleware: Middleware = (api) => (next) => (action) => {
  if (__PROJECT__ === 'jest') {
    return next(action);
  }

  // eslint-disable-next-line no-console
  const consoleErrorFunc = console.error;

  /*
    используем 'unknownAction', чтобы избежать несоответствия типов:
      - у типа 'Middleware': тип 'action' - это 'unknown'
      - чтобы использовать 'action.type' вместо 'unknown': должен быть тип 'UnknownAction'
  */
  const unknownAction = action as UnknownAction;

  /*
    отключаем консоль с выводом ошибки для типов экшенов, которые приводят к ошибке при
    удалении асинхронного редюсера ('@DESTROY loginForm reducer', '@DESTROY profile reducer', ...)

    \s - пробел, \S* - любое количество непробельных символов
  */
  if (/^@DESTROY\s\S*\sreducer$/g.test(unknownAction.type)) {
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
