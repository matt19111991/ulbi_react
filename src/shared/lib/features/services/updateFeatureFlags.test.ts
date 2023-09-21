import { TestAsyncThunk } from '../../tests/TestAsyncThunk/TestAsyncThunk';

import { updateFeatureFlags } from './updateFeatureFlags';

describe('updateFeatureFlags', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        reload: jest.fn(),
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: 'original',
    });
  });

  test('success update feature flags', async () => {
    const thunk = new TestAsyncThunk(updateFeatureFlags);

    const result = await thunk.callThunk({
      newFeatures: {
        isAppRedesigned: true,
      },
      userId: '1',
    });

    expect(thunk.dispatch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('error update feature flags', async () => {
    const thunk = new TestAsyncThunk(updateFeatureFlags);

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
