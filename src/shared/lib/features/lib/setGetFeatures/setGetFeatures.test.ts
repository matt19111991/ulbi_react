import type { FeatureFlags } from '@/shared/types/featureFlags';

import { getAllFeatureFlags, getFeatureFlag, setFeatureFlags } from './setGetFeatures';

const mockFeatureFlags: FeatureFlags = {
  isAppRedesigned: true,
  isArticleRatingEnabled: false,
};

describe('setGetFeatures', () => {
  afterEach(() => {
    setFeatureFlags({});
  });

  test('test set and get feature flags', () => {
    setFeatureFlags(mockFeatureFlags);

    expect(getAllFeatureFlags()).toEqual(mockFeatureFlags);
  });

  test('test set and get empty flags', () => {
    setFeatureFlags();

    expect(getAllFeatureFlags()).toEqual({});
  });

  describe('getFeatureFlag', () => {
    test('isAppRedesigned flag should be truthy', () => {
      setFeatureFlags(mockFeatureFlags);

      expect(getFeatureFlag('isAppRedesigned')).toBeTruthy();
    });

    test('isArticleRatingEnabled flag should be falsy', () => {
      setFeatureFlags(mockFeatureFlags);

      expect(getFeatureFlag('isArticleRatingEnabled')).toBeFalsy();
    });
  });
});
