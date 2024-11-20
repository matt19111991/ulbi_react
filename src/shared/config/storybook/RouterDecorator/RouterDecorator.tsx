import { BrowserRouter } from 'react-router-dom';
import type { StoryFn } from '@storybook/react';

// 'Navbar stories' без 'RouterDecorator' выкидывает ошибку

export const RouterDecorator = (Story: StoryFn): JSX.Element => (
  <BrowserRouter
    // подготовка к переходу на 'react-router-dom v.7'
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <Story />
  </BrowserRouter>
);
