import type { PageScrollSchema } from '../types/page';

import { pageScrollActions, pageScrollReducer } from './pageScrollSlice';

describe('pageScrollSlice', () => {
  test('test set scroll position', () => {
    const state: DeepPartial<PageScrollSchema> = {
      scroll: {},
    };

    const reducer = pageScrollReducer(
      state as PageScrollSchema,
      pageScrollActions.setScrollPosition({ path: 'test_page', position: 500 }),
    );

    expect(reducer).toEqual({
      scroll: {
        test_page: 500,
      },
    });
  });
});
