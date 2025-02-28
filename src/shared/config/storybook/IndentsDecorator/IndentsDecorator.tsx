import type { JSX } from 'react';
import type { StoryContext, StoryFn } from '@storybook/react';

export const IndentsDecorator = (Story: StoryFn, context: StoryContext): JSX.Element => (
  <div style={{ padding: 16 }}>{Story({}, context)}</div>
);
