import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

// через замыкания пробрасываем тему, затем функцию Story и вызываем её

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn): ReactElement<unknown> => {
  const getThemedStory = () => (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );

/* Если вернуть JSX то будет ошибка ESLint:
   Component definition is missing display name(react/display-name)
*/

   return getThemedStory();
};
