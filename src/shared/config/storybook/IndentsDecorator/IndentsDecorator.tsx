import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

export const IndentsDecorator = (Story: StoryFn): ReactElement => (
  <div className='sb-container'>
    <Story />
  </div>
);
