import type { Preview } from '@storybook/react';

import {
  GlobalStyleDecorator,
} from '../../src/shared/config/storybook/GlobalStyleDecorator/GlobalStyleDecorator';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import {
  TranslationDecorator,
} from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';

import { Theme } from '../../src/app/providers/ThemeProvider';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

/* добавление декораторов на глобальном уровне (порядок неважен)
   по умолчанию добавлена светлая тема, локально можно переопределить на другую
*/

export const decorators = [
  GlobalStyleDecorator,
  RouterDecorator,
  ThemeDecorator(Theme.LIGHT),
  TranslationDecorator,
];
