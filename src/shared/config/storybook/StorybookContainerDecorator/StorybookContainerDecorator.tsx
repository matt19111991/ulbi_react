import type { JSX } from 'react';
import type { StoryFn } from '@storybook/react';

export const StorybookContainerDecorator = (Story: ReturnType<StoryFn>): JSX.Element => (
  <div className='sb-container'>
    <Story />
  </div>
);
