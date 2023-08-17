import type { Preview } from '@storybook/react';

import {
  GlobalStyleDecorator,
} from '../../src/shared/config/storybook/GlobalStyleDecorator/GlobalStyleDecorator';

import {
  IndentsDecorator,
} from '../../src/shared/config/storybook/IndentsDecorator/IndentsDecorator';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';

import {
  SuspenseDecorator,
} from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '../../src/shared/const/theme';

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
  IndentsDecorator,
  RouterDecorator,
  SuspenseDecorator,
  ThemeDecorator(Theme.LIGHT),
];
