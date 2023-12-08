import type { Preview } from '@storybook/react';

import { StateSchema } from '../../src/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { GlobalStyleDecorator } from '../../src/shared/config/storybook/GlobalStyleDecorator/GlobalStyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { StorybookContainerDecorator } from '../../src/shared/config/storybook/StorybookContainerDecorator/StorybookContainerDecorator';
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
    layout: 'fullscreen',
  },
};

const state: DeepPartial<StateSchema> = {}; // заглушка 'state'

/*
  Добавление декораторов на глобальном уровне (порядок важен)

  По умолчанию добавлена светлая тема, локально можно переопределить на другую

  'StoreDecorator' должен быть после 'ThemeDecorator'
*/

export const decorators = [
  // по умолчанию отображаем старый дизайн для каждой story
  FeatureFlagsDecorator({ isAppRedesigned: false }),

  GlobalStyleDecorator,
  RouterDecorator,
  StorybookContainerDecorator,
  SuspenseDecorator,
  ThemeDecorator(Theme.LIGHT),
  StoreDecorator(state),
];

export const customViewports = {
  xs: {
    name: 'XS',
    styles: {
      width: '350px',
      height: '963px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '600px',
      height: '801px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '900px',
      height: '801px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '1280px',
      height: '801px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1536px',
      height: '801px',
    },
  },
};
