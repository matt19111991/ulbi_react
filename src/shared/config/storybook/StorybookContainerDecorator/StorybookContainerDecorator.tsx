import type { JSX } from 'react';
import type { StoryContext, StoryFn } from '@storybook/react';

export const StorybookContainerDecorator = (Story: StoryFn, context: StoryContext): JSX.Element => (
  <div className='sb-container'>{Story({}, context)}</div>
);
