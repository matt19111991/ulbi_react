import type { JSX } from 'react';
import type { StoryContext, StoryFn } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';

import type { FeatureFlags } from '@/shared/types/featureFlags';

// через замыкания пробрасываем 'features', затем функцию 'Story' и вызываем её

export const FeatureFlagsDecorator =
  (features: FeatureFlags) =>
  (Story: StoryFn, context: StoryContext): JSX.Element => {
    setFeatureFlags(features);

    // основной фон и цвет темы для всего приложения в 'storybook' применяются через 'appClass'
    const appClass = features.isAppRedesigned ? 'app_redesigned' : 'app';

    /*
      Если вернуть 'JSX' то будет ошибка 'ESLint':
      'Component definition is missing display name(react/display-name)'
    */
    const getStory = () => <div className={appClass}>{Story({}, context)}</div>;

    return getStory();
  };
