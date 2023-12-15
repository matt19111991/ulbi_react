import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
/*
  Для оптимизации сборки в dev-режиме, мы используем что-то одно из:
    1. Только 'babel-loader' без 'ts-loader'. НО!!! 'babel-loader' не умеет в 'runtime' проверять типы

    2. Опцию 'transpileOnly: true' для 'ts-loader':
         'ts-loader' будет заниматься только компиляцией ts кода во время сборки БЕЗ ПРОВЕРКИ ТИПОВ
         (прирост времени сборки почти в 2 раза)

    Для обоих вариантов нужно вынести проверку типов в отдельный процесс ('fork-ts-checker-webpack-plugin')
*/

  const tsBabelLoader = buildBabelLoader(false, options.isDev);
  const tsxBabelLoader = buildBabelLoader(true, options.isDev);

  const cssLoaders = buildCssLoader(options.isDev);

/*
  'raw-loader', 'url-loader' и 'file-loader' можно заменить на Asset Modules (Webpack 5)

  const assetLoader = { // замена для 'file-loader'
    test: /\.(png|jpe?g|gif)$/i, // обрабатывает только PNG, JPG, JPEG и GIF изображения
    type: 'asset/resource',
  };
*/
  const fileLoader = {
  // если нужно будет добавить обработку шрифтов, достаточно расширить регулярку "/\.(png|jpe?g|gif|woff)$/i"
  test: /\.(png|jpe?g|gif)$/i, // обрабатывает только PNG, JPG, JPEG и GIF изображения
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = buildSvgLoader();

/*
  ts-loader умеет обрабатывать JSX. Для нативного JS нужен дополнительно 'babel-loader'
  const typeScriptLoader = {
    test: /\.tsx?$/,
    exclude: '/node-modules/',
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: options.isDev, // компиляция ts кода во время сборки БЕЗ ПРОВЕРКИ ТИПОВ
      },
    },
  };
*/
  return [ // порядок лоадеров в массиве имеет значение
    // assetLoader,
    fileLoader,
    svgLoader,

    tsBabelLoader,
    tsxBabelLoader,

/* 'babel-loader' нужно использовать для корректной работы React/JSX; сейчас это покрывается 'ts-loader'
    babelLoader, // должен идти выше typeScriptLoader

    typeScriptLoader,
*/
    cssLoaders,
  ];
}
