import type { JSX } from 'react';
import type { StoryFn } from '@storybook/react';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { Theme } from '@/shared/const/theme';

// через замыкания пробрасываем тему, затем функцию 'Story' и вызываем её

export const ThemeDecorator =
  (theme: Theme) =>
  (Story: ReturnType<StoryFn>): JSX.Element => {
    /*
      может не меняться цвет скролла при переключении темы, поэтому добавляем класс на 'body'
      через 'requestAnimationFrame()'

      можно использовать промисы или 'setTimeout()', главное - это добавить изменение класса в
      очередь, иначе тема всегда будет выставленной по умолчанию в 'preview.tsx'
    */
    requestAnimationFrame(() => {
      document.body.className = theme;
    });

    const getThemedStory = () => (
      <ThemeProvider initialTheme={theme}>
        <div className={theme}>
          <Story />
        </div>
      </ThemeProvider>
    );

    /*
      Если вернуть 'JSX' то будет ошибка 'ESLint':
      'Component definition is missing display name(react/display-name)'
    */

    return getThemedStory();
  };
