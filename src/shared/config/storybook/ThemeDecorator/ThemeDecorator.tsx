import { JSX } from 'react';
import { StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

// через замыкания пробрасываем тему, а затем StoryComponent

export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryObj): JSX.Element => (
  <div className={`app ${theme}`}>
    <StoryComponent />
  </div>
);
