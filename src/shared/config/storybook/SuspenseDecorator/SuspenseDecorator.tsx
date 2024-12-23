import { Suspense } from 'react';
import type { JSX } from 'react';
import type { StoryFn } from '@storybook/react';

export const SuspenseDecorator = (Story: ReturnType<StoryFn>): JSX.Element => (
  <Suspense fallback=''>
    <Story />
  </Suspense>
);
