import webpack from 'webpack';

/*
  плагин позволяет избавиться от кольцевых зависимостей:
  модуль 'A' использует модуль 'B', а модуль 'B' использует модуль 'A'
  чтобы от этого избавиться, нужно создать модуль 'С' и вынести туда то,
  что используется в двух других модулях

  Статья: https://habr.com/ru/articles/569378
*/
import CircularDependencyPlugin from 'circular-dependency-plugin'; // аналог 'dependency-cruiser'

// плагин, чтобы в папку '/build/locales' попадали файлы переводов из '/public/locales' и 'favicon'
import CopyPlugin from 'copy-webpack-plugin';

/*
  плагин для проверки типов в отдельном процессе в 'runtime' при использовании 'babel-loader' или
  'ts-loader' c опцией 'transpileOnly: true'
*/
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// плагин, чтобы в папку '/build' попадали помимо 'JS' файлов еще и 'HTML' файлы
import HTMLWebpackPlugin from 'html-webpack-plugin';

// плагин создает 'CSS' файл для каждого 'JS' файла (который использует 'CSS')
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/*
  плагин позволяет применить правки в коде без перезагрузки страницы (стабильнее 'webpack-dev-server')

  необходимо свойство 'overrides' в 'package.json' с указанием последней версии 'webpack-dev-server',
  т.к. '@pmmmwh/react-refresh-webpack-plugin' работает только с 'webpack-dev-server' v.4.x

  import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
*/

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// плагин позволяет прокидывать глобальные переменные во всё приложение
import { buildDefinePlugin } from './plugins/buildDefinePlugin';

import type { BuildOptions } from './types/config';

export function buildPlugins({
  apiUrl,
  isDev,
  paths,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [ // порядок плагинов не имеет значения
    new HTMLWebpackPlugin({
//    favicon: paths.favicon,

/*    без опции 'template' в файле './build/index.html' не будет "<div id='root'></div>",
      а создастся шаблонный 'HTML' файл

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
/*
    '@pmmmwh/react-refresh-webpack-plugin' позволяет применить правки в коде без перезагрузки страницы
    Обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки

    необходимо свойство 'overrides' в 'package.json' с указанием последней версии 'webpack-dev-server',
    т.к. '@pmmmwh/react-refresh-webpack-plugin' работает только с 'webpack-dev-server' v.4.x

    plugins.push(new ReactRefreshWebpackPlugin());
*/

//  плагин отображает прогресс компиляции (в 'production' лучше отключать, т.к. может замедлять сборку)
    plugins.push(new webpack.ProgressPlugin());

    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure', // вывод ошибок на экран, поставляемый 'webpack-dev-server'
        typescript: {
          diagnosticOptions: { // настройки по умолчанию из документации
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references', // настройки по умолчанию из документации
        },
      }),
    );
  }

  if (!isDev) {
/*
    'MiniCssExtractPlugin' создает 'CSS' файл для каждого 'JS' файла (который использует 'CSS')
    В то время, как 'style-loader' пишет стили в 'DOM' как инлайн стили
*/
    plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].[contenthash:8].css',
        filename: 'css/[name].[contenthash:8].css',
      }),
    );
/*
    'BundleAnalyzerPlugin' позволяет анализировать размер 'bundle' и размеры зависимостей
    нет смысла использовать в 'development' режиме, т.к. 'bundle' не минимизирован и имеет множество зависимостей
*/  plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static', // сгенерируется отдельный 'HTML' файл с отчетом ('report.html')
      logLevel: 'error',
      openAnalyzer: false, // не открывать страницу с 'BundleAnalyzerPlugin' при каждом запуске приложения
    }));

    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: paths.favicon, to: paths.build },
          { from: paths.locales, to: paths.buildLocales },
          { from: paths.robots, to: paths.build },
        ],
      }),
    );
  }

  return plugins;
}
