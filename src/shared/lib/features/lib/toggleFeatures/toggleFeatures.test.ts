import type { FeatureFlags } from '@/shared/types/featureFlags';

import { setFeatureFlags } from '../setGetFeatures/setGetFeatures';

import { toggleFeatures } from './toggleFeatures';

const mockFeatureFlags: FeatureFlags = {
  isAppRedesigned: true,
  isArticleRatingEnabled: false,
};

describe('toggleFeatures', () => {
  beforeAll(() => {
    setFeatureFlags(mockFeatureFlags);
  });

  afterAll(() => {
    setFeatureFlags({});
  });

  test('test on', () => {
    expect(
      toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 'on',
        off: () => 'off',
      }),
    ).toBe('on');
  });

  test('test off', () => {
    expect(
      toggleFeatures({
        name: 'isCounterEnabled',
        on: () => 'on',
        off: () => 'off',
      }),
    ).toBe('off');
  });
});
