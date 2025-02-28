import type { JSX } from 'react';
import { BrowserRouter } from 'react-router';
import type { StoryContext, StoryFn } from '@storybook/react';

// 'Navbar stories' без 'RouterDecorator' выкидывает ошибку

export const RouterDecorator = (Story: StoryFn, context: StoryContext): JSX.Element => (
  <BrowserRouter>{Story({}, context)}</BrowserRouter>
);
