import type { StoryFn } from '@storybook/react';

export const IndentsDecorator = (Story: StoryFn): JSX.Element => (
  <div style={{ padding: 16 }}>
    <Story />
  </div>
);
