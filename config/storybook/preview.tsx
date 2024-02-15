import type { Preview } from '@storybook/react';

import type { StateSchema } from '../../src/app/providers/StoreProvider';

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
    actions: {
      argTypesRegex: '^on[A-Z].*' /* регулярка для автоматического создания экшенов:
                                        export const PrimaryText: Story = {
                                          args: {
                                            onSubmit: action('onSubmit'),
                                          },
                                        };
                                  */,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i, // отобразит 'color picker' для аргументов, которые соответствуют цвету
        date: /Date$/, // отобразит 'date picker' для аргументов, которые соответствуют дате
      },
    },

    layout: 'fullscreen', // свойство не работает (у нас свой 'StorybookContainerDecorator' для этого)
  },
};

const state: DeepPartial<StateSchema> = {}; // заглушка 'state'

// добавление декораторов на глобальном уровне (порядок важен, применяются сверху вниз)
export const decorators = [
  // по умолчанию отображаем старый дизайн для каждой 'story'
  FeatureFlagsDecorator({ isAppRedesigned: false }),

  GlobalStyleDecorator,
  RouterDecorator,
  StorybookContainerDecorator,
  SuspenseDecorator,

  // по умолчанию задаем светлую тему, локально можно переопределить на другую
  ThemeDecorator(Theme.LIGHT),

  // 'StoreDecorator' должен быть после 'ThemeDecorator'
  StoreDecorator(state),
];

export const customViewports = {
  xs: {
    name: 'XS',
    styles: {
      height: '963px',
      width: '350px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      height: '801px',
      width: '600px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      height: '801px',
      width: '900px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      height: '801px',
      width: '1280px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      height: '801px',
      width: '1536px',
    },
  },
};
