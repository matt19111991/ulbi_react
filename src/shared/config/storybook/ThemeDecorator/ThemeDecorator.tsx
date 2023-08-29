import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

// eslint-disable-next-line path-checker-1911/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { Theme } from '@/shared/const/theme';

// через замыкания пробрасываем тему, затем функцию Story и вызываем её

export const ThemeDecorator =
  (theme: Theme) =>
  (Story: StoryFn): ReactElement<unknown> => {
    // чтобы не вешать дополнительные классы `${theme}` для 'App.tsx' и порталов
    document.body.className = theme;

    const getThemedStory = () => (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <Story />
        </div>
      </ThemeProvider>
    );

    /*
      Если вернуть JSX то будет ошибка ESLint:
      Component definition is missing display name(react/display-name)
    */

    return getThemedStory();
  };
