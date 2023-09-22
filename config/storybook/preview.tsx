import type { DeepPartial } from '@reduxjs/toolkit';
import type { Preview } from '@storybook/react';

import { StateSchema } from '../../src/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { GlobalStyleDecorator } from '../../src/shared/config/storybook/GlobalStyleDecorator/GlobalStyleDecorator';
import { IndentsDecorator } from '../../src/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
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
  IndentsDecorator,
  RouterDecorator,
  SuspenseDecorator,
  ThemeDecorator(Theme.LIGHT),
  StoreDecorator(state),
];
