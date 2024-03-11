import { Suspense } from 'react';
import type { StoryFn } from '@storybook/react';

export const SuspenseDecorator = (Story: StoryFn): JSX.Element => (
  <Suspense fallback=''>
    <Story />
  </Suspense>
);
