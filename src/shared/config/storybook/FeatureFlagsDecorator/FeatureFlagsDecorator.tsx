import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';

import { FeatureFlags } from '@/shared/types/featureFlags';

// через замыкания пробрасываем features, затем функцию Story и вызываем её

export const FeatureFlagsDecorator =
  (features: FeatureFlags) =>
  (Story: StoryFn): ReactElement<unknown> => {
    setFeatureFlags(features);

    /*
      Если вернуть JSX то будет ошибка ESLint:
      Component definition is missing display name(react/display-name)
    */

    const getStory = () => <Story />;

    return getStory();
  };
