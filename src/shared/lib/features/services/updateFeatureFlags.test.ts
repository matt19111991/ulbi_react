import type { ErrorAction } from '@/shared/types/api';

import { getAllFeatureFlags } from '../lib/setGetFeatures/setGetFeatures';

import { TestAsyncThunk } from '../../tests/TestAsyncThunk/TestAsyncThunk';

import { updateFeatureFlags } from './updateFeatureFlags';
import type { UpdateFeatureFlagsOptions } from './updateFeatureFlags';

describe('updateFeatureFlags', () => {
  // взято из интернета
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        reload: jest.fn(),
      },
    });
  });

  // взято из интернета
  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: 'original',
    });
  });

  test('success update feature flags', async () => {
    const thunk = new TestAsyncThunk(updateFeatureFlags);

    const args: UpdateFeatureFlagsOptions = {
      newFeatures: {
        isAppRedesigned: true,
      },
      userId: '1',
    };

    const result = await thunk.callThunk(args);

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(result.meta.requestStatus).toBe('fulfilled');

    expect(result.payload).toBeUndefined();

    expect(getAllFeatureFlags()).toEqual(args.newFeatures);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  test('error update feature flags', async () => {
    const thunk = new TestAsyncThunk(updateFeatureFlags);

    // некорректные данные: ничего не передаем аргументами в 'thunk.callThunk()', чтобы вызвать ошибку
    const result = (await thunk.callThunk()) as ErrorAction;

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('rejected');

    expect(result.error.message).toBe(
      "Cannot read properties of undefined (reading 'newFeatures')",
    );
  });
});
