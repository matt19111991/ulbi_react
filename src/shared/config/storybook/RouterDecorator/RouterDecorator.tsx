import { BrowserRouter } from 'react-router';
import type { StoryFn } from '@storybook/react';

// 'Navbar stories' без 'RouterDecorator' выкидывает ошибку

export const RouterDecorator = (Story: StoryFn): JSX.Element => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
