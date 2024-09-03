import path from 'path';
import type { Configuration, ResolveOptions, RuleSetRule, WebpackPluginInstance } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

import { buildDefinePlugin } from '../build/plugins/buildDefinePlugin';

import type { BuildPaths } from '../build/types/config';

/*
  отдельный 'webpack.config.ts' для 'storybook', чтобы была возможность:
    - использовать относительные пути
    - не указывать расширения файлов
    - использовать 'CSS-modules'
*/

interface StorybookResolveOptions extends ResolveOptions {
  extensions: string[];
  modules: string[];
}

interface StorybookWebpackConfiguration extends Configuration {
  module: {
    rules: RuleSetRule[];
  };
  plugins: WebpackPluginInstance[];
  resolve: StorybookResolveOptions;
}

// извлекаем 'config' 'storybook-a', у 'storybook' своя кастомная версия 'webpack.config'
export default ({ config }: { config: StorybookWebpackConfiguration }) => {
  // --- Лоадеры ---

  // настройка 'CSS-modules'
  config.module.rules.push(buildCssLoader(true)); // 'storybook' используем только в режиме разработки

  /*
    отключение обработки 'SVG' файлов через дефолтные лоадеры 'storybook-a' ('asset/resource' для 'Webpack 5') и
    подключение '@svgr/webpack' лоадера
  */

  config.module.rules = config.module.rules.map((rule) => {
    // если в поле 'test' для лоадера есть совпадение по 'svg'
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }; // исключаем обработку 'SVG' файлов
    }

    return rule;
  });

  config.module.rules.push(buildSvgLoader()); // подключение '@svgr/webpack' лоадера

  const paths: BuildPaths = {
    build: '',
    buildAssets: '',
    buildLocales: '',
    entry: '',
    favicon: '',
    googleVerification: '',
    html: '',
    locales: '',
    manifest: '',
    manifestAssets: '',
    robots: '',
    serviceWorker: '',
    sitemapIndex: '',
    sitemap1: '',
    sitemap2: '',
    src: path.resolve(__dirname, '..', '..', 'src'), // единственный важный путь
  };

  // --- Плагины ---

  // 'storybook' используем только в режиме разработки, 'API' не используем
  const additionalDefinePlugin = buildDefinePlugin('https://testapi.com', true, 'storybook', '');

  /*
    к существующему 'DefinePlugin':

    DefinePlugin: {
      definitions: {
        'process.env.NODE_ENV': '"development"',
        'process.env.NODE_PATH': '[]',
        'process.env.STORYBOOK': '"true"',
        'process.env.PUBLIC_URL': '"."',
         NODE_ENV: '"development"'
      }
    }

    добавляем еще один 'DefinePlugin' со своими переменными окружения; переменные из обоих плагинов мержатся
  */
  config.plugins.push(additionalDefinePlugin);

  // настройка 'alias' для 'storybook' среды
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': paths.src,
  };

  // задаем относительные пути
  config.resolve.modules.push(paths.src);

  return config;
};
