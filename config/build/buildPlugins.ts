import webpack from 'webpack';

/* плагин позволяет избавиться от кольцевых зависимостей:
   модуль 'A' использует модуль 'B', а модуль 'B' использует модуль 'A'
   чтобы от этого избавиться, нужно создать модуль 'С' и вынести туда то,
   что используется в двух других модулях
*/
import CircularDependencyPlugin from 'circular-dependency-plugin'; // аналог 'dependency-cruiser'

// плагин, чтобы в папку /build/locales попадали файлы переводов из /public/locales
import CopyPlugin from 'copy-webpack-plugin';

/*
  плагин, для проверки типов в отдельном процессе в runtime при использовании
  'babel-loader' или 'ts-loader' c опцией 'transpileOnly: true'
*/
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// плагин, чтобы в папку /build попадали помимо JS файлов еще и HTML файлы
import HTMLWebpackPlugin from 'html-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { buildDefinePlugin } from './plugins/buildDefinePlugin';

import { BuildOptions } from './types/config';

export function buildPlugins({
  apiUrl,
  isDev,
  paths,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [ // порядок плагинов не имеет значения
    new HTMLWebpackPlugin({
/*    без опции 'template' в файле './build/index.html' не будет "<div id='root'></div>",
      а создастся шаблонный html файл

      нужно указать свой шаблон из папки './public/index.html' для файла './build/index.html'
*/
      template: paths.html,
    }),

    buildDefinePlugin(apiUrl, isDev, project),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ];

  if (isDev) {
/*  HotModuleReplacementPlugin позволяет применить правки в коде без перезагрузки страницы
    Обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки

    Если 'HotModuleReplacementPlugin' будет работать нестабильно, можно использовать 'react-refresh-webpack-plugin'
    plugins.push(new ReactRefreshWebpackPlugin());

    plugins.push(new webpack.HotModuleReplacementPlugin());
*/

//  ProgressPlugin отображает прогресс компиляции (в 'production' лучше отключать, т.к. может замедлять сборку)
    plugins.push(new webpack.ProgressPlugin());

    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
      }),
    );
  }

  if (!isDev) {
    /*  MiniCssExtractPlugin создает CSS файл для каждого JS файла (который использует CSS)
        В то время, как style-loader пишет стили в DOM как инлайн стили
    */
    plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].[contenthash:8].css',
        filename: 'css/[name].[contenthash:8].css',
      }),
    );
/*
    BundleAnalyzerPlugin позволяет анализировать размер bundle и размеры зависимостей
    (нет смысла использовать в 'development' режиме, т.к. bundle не минимизирован и имеет множество зависимостей)
*/  plugins.push(new BundleAnalyzerPlugin({
      logLevel: 'error',
      openAnalyzer: false, // не открывать страницу с BundleAnalyzerPlugin при каждом запуске приложения
    }));

    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: paths.favicon, to: paths.build },
          { from: paths.locales, to: paths.buildLocales },
        ],
      }),
    );
  }

  return plugins;
}
