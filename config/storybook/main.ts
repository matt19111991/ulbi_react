/*
  Перед инициализацией 'storybook', необходимо очистить 'npm cache' при помощи команды:
  rm -rf ~/.npm/_npx
  Иначе ошибка "Error: Cannot find module './util'"
*/

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    {
      // добавляются секции 'Actions' и 'Controls' в 'storybook'
      name: '@storybook/addon-essentials',
      options: {
        // у нас свое переключение темы, 'backgrounds' не будет работать, поэтому отключаем это свойство
        backgrounds: false,
      },
    },

    // '@storybook/addon-interactions', // можно использовать для написания сценариев и
    // '@storybook/testing-library', // прогона визуальных тестов

    // '@storybook/addon-links', // можно использовать для навигации между 'stories'

    // '@storybook-addon-themes' не совместим с 'Storybook v.7+'
  ],

  core: {
    // отключаем телеметрию и сбор анонимных данных (чтобы не было предупреждения в консоли при запуске)
    disableTelemetry: true,
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  staticDirs: ['../../public'],

  stories: ['../../src/**/*.stories.tsx'],

  /*
    При ошибке 'Invalid configuration object. Webpack has been initialised using a configuration
    object that does not match the API schema', нужно перенести содержимое файла 'webpack.config.ts'
    в свойство 'webpackFinal':

    webpackFinal: async (config, { configType }) => {
      ...
    };
 */
};

export default config;
