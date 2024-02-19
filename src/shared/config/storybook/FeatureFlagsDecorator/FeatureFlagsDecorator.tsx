import type { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';

import type { FeatureFlags } from '@/shared/types/featureFlags';

// через замыкания пробрасываем 'features', затем функцию 'Story' и вызываем её

export const FeatureFlagsDecorator =
  (features: FeatureFlags) =>
  (Story: StoryFn): ReactElement => {
    setFeatureFlags(features);

    // основной фон и цвет темы для всего приложения в 'storybook' применяются через 'appClass'
    const appClass = features.isAppRedesigned ? 'app_redesigned' : 'app';

    /*
      Если вернуть 'JSX' то будет ошибка 'ESLint':
      'Component definition is missing display name(react/display-name)'
    */
    const getStory = () => (
      <div className={appClass}>
        <Story />
      </div>
    );

    return getStory();
  };
