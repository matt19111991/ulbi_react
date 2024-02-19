import type { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

export const IndentsDecorator = (Story: StoryFn): ReactElement => (
  <div style={{ padding: 16 }}>
    <Story />
  </div>
);
