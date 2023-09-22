import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';

// через замыкания пробрасываем тему, затем функцию Story и вызываем её

export const ThemeDecorator =
  (theme: Theme) =>
  (Story: StoryFn): ReactElement<unknown> => {
    // чтобы не вешать дополнительные классы `${theme}` для 'App.tsx' и порталов
    document.body.className = theme;

    const mainClass =
      localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY) === 'new' ? 'app_redesigned' : 'app';

    const getThemedStory = () => (
      <ThemeProvider initialTheme={theme}>
        <div className={`${mainClass} ${theme}`}>
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
