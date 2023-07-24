import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

export const getPageScroll = (state: StateSchema) => state.pageScroll.scroll;

// Использование: useSelector(state => getPageScrollByPath(state, path));
export const getPageScrollByPath = createSelector(
  getPageScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
