import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';

export const AnimationDecorator = (Story: StoryFn): ReactElement => (
  <AnimationProvider>
    <Story />
  </AnimationProvider>
);
