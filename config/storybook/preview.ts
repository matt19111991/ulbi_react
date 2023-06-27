import type { Preview } from '@storybook/react';

import {
  GlobalStyleDecorator,
} from '../../src/shared/config/storybook/GlobalStyleDecorator/GlobalStyleDecorator';

import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '../../src/app/providers/ThemeProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    decorators: [GlobalStyleDecorator, ThemeDecorator(Theme.DARK)],
  },
};

export default preview;
