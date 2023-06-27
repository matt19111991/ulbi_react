/*
  Команда для инициализации Storybook v7.1.0-alpha.40 под Webpack 5:
  npx sb@next init --builder webpack5
  В остальных случаях ошибка "Error: Cannot find module './util'"
*/

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },
};

export default config;
