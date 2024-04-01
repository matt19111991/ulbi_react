import { createSelector } from '@reduxjs/toolkit';

import type { StateSchema } from '@/app/providers/StoreProvider';

export const getPageScroll = (state: StateSchema) => state.pageScroll.scroll;

/*
  использование 'createSelector()' с дополнительными аргументами помимо 'state':
 'useSelector(state => getPageScrollByPath(state, path));'

  'createSelector()' принимает аргументами:
    - 'input selectors' - это все аргументы, кроме последнего; можно передавать массивом:
                         'createSelector([input_selector_1, input_selector_2], result_function)'
    - 'result function' - последняя функция, которая принимает вычисленные значения из
                         'input selectors' на вход аргументами,
                          количество аргументов равно количеству 'input selectors'
*/
export const getPageScrollByPath = createSelector(
  /*
    в каждом 'input selector' есть доступ как к 'state', так и 'path' для 'getPageScrollByPath()'

    в 'result function' будем использовать 2 аргумента
  */
  getPageScroll, // 1 'input selector' - возвращенное значение из 'getPageScroll()'
  (state: StateSchema, path: string) => path, // 2 'input selector' - значение 'path'
  (scroll, path) => scroll[path] || 0, // 'result function'
);
