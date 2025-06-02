/*
  Перед инициализацией 'storybook', необходимо очистить 'npm cache' при помощи команды:
  rm -rf ~/.npm/_npx
  Иначе ошибка "Error: Cannot find module './util'"
*/

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    /*
      из 'Storybook v.8+' удалили 'Babel', чтобы сделать 'Storybook' более гибким и позволить
      использовать различные компиляторы ('SWC' и др.)

      для использования 'Babel' нужен дополнительный аддон
    */
    '@storybook/addon-webpack5-compiler-babel',

    // '@storybook/addon-links', // можно использовать для навигации между 'stories'
  ],

  core: {
    // отключаем телеметрию и сбор анонимных данных (чтобы не было предупреждения в консоли при запуске)
    disableTelemetry: true,

    disableWhatsNewNotifications: true, // отключаем окно "What's New" при запуске 'Storybook'
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  staticDirs: ['../../public'],

  stories: ['../../src/**/*.stories.tsx'],

  typescript: {
    reactDocgen: 'react-docgen-typescript', // для корректной работы 'Storybook v.8+'
  },

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
