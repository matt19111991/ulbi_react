import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import type { StoryFn } from '@storybook/react';

// Navbar stories без RouterDecorator выкидывает ошибку

export const RouterDecorator = (Story: StoryFn): ReactElement => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);
