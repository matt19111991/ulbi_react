/*
  Перед инициализацией storybook, необходимо очистить npm cache при помощи команды:
  rm -rf ~/.npm/_npx
  Иначе ошибка "Error: Cannot find module './util'"
*/

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        // у нас свое переключение темы, 'backgrounds' не будет работать, поэтому отключаем это свойство
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',

    // storybook-addon-themes не совместим с Storybook v.7+
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  staticDirs: ['../../public'],

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
