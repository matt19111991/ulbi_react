import { ReactElement, Suspense } from 'react';
import type { StoryFn } from '@storybook/react';

export const SuspenseDecorator = (Story: StoryFn): ReactElement => (
  <Suspense fallback=''>
    <Story />
  </Suspense>
);
