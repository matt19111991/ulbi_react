/*
  библиотека для корректной работы '@pmmmwh/react-refresh-webpack-plugin' при использовании 'ts-loader'
  import ReactRefreshTypeScript from 'react-refresh-typescript';
*/
import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';

import type { BuildOptions } from './types/config';

/*
  Альтернативные и более современные варианты загрузчиков вместо 'babel-loader' и 'ts-loader':
  - 'swc-loader'
  - 'esbuild-loader'
*/

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
/*
  Для оптимизации сборки в 'development' режиме, мы используем что-то одно из:
    1. Только 'babel-loader' без 'ts-loader'. НО!!! 'babel-loader' не умеет в 'runtime' проверять типы

    2. Опцию 'transpileOnly: true' для 'ts-loader':
         'ts-loader' будет заниматься только компиляцией 'TS' кода во время сборки БЕЗ ПРОВЕРКИ ТИПОВ
         (прирост времени сборки почти в 2 раза)

    Для обоих вариантов нужно вынести проверку типов в отдельный процесс ('fork-ts-checker-webpack-plugin')
*/

  const tsBabelLoader = buildBabelLoader(false, options.isDev);
  const tsxBabelLoader = buildBabelLoader(true, options.isDev);

  const cssLoaders = buildCssLoader(options.isDev);

  // 'raw-loader', 'url-loader' и 'file-loader' можно заменить на 'Asset Modules' ('Webpack 5')

  const assetLoader = { // замена для 'file-loader'
    // обрабатывает 'PNG', 'JPG', 'JPEG', 'GIF' изображения и 'EOT', 'TTF, 'WOFF', 'WOFF2' шрифты
    test: /\.(png|jpe?g|gif|eot|ttf|woff?2)$/i,
    type: 'asset/resource', // покрывает функционал 'file-loader'
  };

/*
  const fileLoader = {
    // если нужно будет добавить обработку шрифтов, достаточно расширить регулярку "/\.(png|jpe?g|gif|woff)$/i"
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };
*/

  const svgLoader = buildSvgLoader();

/*
  // 'ts-loader' умеет обрабатывать 'JSX'. Для нативного 'JS' нужен дополнительно 'babel-loader'
  const typeScriptLoader = {
    test: /\.tsx?$/,
    exclude: '/node-modules/',
    use: {
      loader: 'ts-loader',
      options: {
        // задаем для корректной работы '@pmmmwh/react-refresh-webpack-plugin':
        getCustomTransformers: () => ({
          // дополнительно нужно добавить '@pmmmwh/react-refresh-webpack-plugin' в массив плагинов:
          // 'config' => 'build' => 'buildPlugins'
          before: [options.isDev && ReactRefreshTypeScript()].filter(Boolean) // отфильтровываем неактивные плагины
        }),

        transpileOnly: options.isDev, // компиляция 'TS' кода во время сборки БЕЗ ПРОВЕРКИ ТИПОВ
      },
    },
  };
*/
  return [ // порядок лоадеров в массиве имеет значение (начинается снизу и идет вверх)
    assetLoader,

    // fileLoader,

    svgLoader,

    tsBabelLoader, // 'babel-loader' и 'ts-loader' взаимозаменяемы, используем что-то одно
    tsxBabelLoader, // Статья: https://qna.habr.com/q/674304

    // typeScriptLoader,

    cssLoaders,
  ];
}
