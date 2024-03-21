import type { StoryFn } from '@storybook/react';

import { AnimationProvider } from '@/shared/lib/providers/AnimationProvider';

export const AnimationDecorator = (Story: StoryFn): JSX.Element => (
  <AnimationProvider>
    <Story />
  </AnimationProvider>
);
