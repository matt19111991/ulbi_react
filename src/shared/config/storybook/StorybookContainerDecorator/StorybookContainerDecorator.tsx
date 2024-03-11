import type { StoryFn } from '@storybook/react';

export const StorybookContainerDecorator = (Story: StoryFn): JSX.Element => (
  <div className='sb-container'>
    <Story />
  </div>
);
