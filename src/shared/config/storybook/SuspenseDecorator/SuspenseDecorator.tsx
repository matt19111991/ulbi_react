import { Suspense } from 'react';
import type { JSX } from 'react';
import type { StoryContext, StoryFn } from '@storybook/react';

export const SuspenseDecorator = (Story: StoryFn, context: StoryContext): JSX.Element => (
  <Suspense fallback=''>{Story({}, context)}</Suspense>
);
