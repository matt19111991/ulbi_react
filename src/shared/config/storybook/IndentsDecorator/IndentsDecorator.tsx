import type { JSX } from 'react';
import type { StoryFn } from '@storybook/react';

export const IndentsDecorator = (Story: ReturnType<StoryFn>): JSX.Element => (
  <div style={{ padding: 16 }}>
    <Story />
  </div>
);
