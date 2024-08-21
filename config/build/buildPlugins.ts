import path from "path";
import { ProgressPlugin } from 'webpack';
import type { WebpackPluginInstance } from 'webpack';

/*
  плагин позволяет избавиться от кольцевых зависимостей:
  модуль 'A' использует модуль 'B', а модуль 'B' использует модуль 'A'
  чтобы от этого избавиться, нужно создать модуль 'С' и вынести туда то,
  что используется в двух других модулях

  статья: 'https://habr.com/ru/articles/569378'
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

  дополнительно нужно:
    - в случае использования 'babel-loader' => добавить 'react-refresh/babel' в список плагинов
      для 'babel-loader'
    - в случае использования 'ts-loader' => добавить 'react-refresh-typescript' в
     'getCustomTransformers' для 'ts-loader'

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
}: BuildOptions): WebpackPluginInstance[] {
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
   '@pmmmwh/react-refresh-webpack-plugin' позволяет применить правки в коде без перезагрузки страницы,
    обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки

    дополнительно нужно:
    - в случае использования 'babel-loader' => добавить 'react-refresh/babel' в список плагинов
      для 'babel-loader'
    - в случае использования 'ts-loader' => добавить 'react-refresh-typescript' в
     'getCustomTransformers' для 'ts-loader'

    plugins.push(new ReactRefreshWebpackPlugin());
*/

//  плагин отображает прогресс компиляции (в 'production' лучше отключать, т.к. может замедлять сборку)
    plugins.push(new ProgressPlugin());

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
   'MiniCssExtractPlugin' создает 'CSS' файл для каждого 'JS' файла (который использует 'CSS'),
    в то время, как 'style-loader' пишет стили в 'DOM' как инлайн стили
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
          { from: paths.googleVerification, to: paths.build },
          { from: paths.locales, to: paths.buildLocales },
          { from: paths.robots, to: paths.build },
          { from: paths.sitemapIndex, to: paths.build },
          { from: paths.sitemap1, to: paths.build },
          { from: paths.sitemap2, to: paths.build },
          { from: path.resolve(__dirname, 'public', 'service-worker.js'), to: paths.build },
        ],
      }),
    );
  }

  return plugins;
}
