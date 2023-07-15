import webpack from 'webpack';

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
/*    без опции 'template' в файле ./build/index.html не будет <div class='root'></div>
      указывает шаблон из папки ./public/index.html для файла ./build/index.html
*/
      template: paths.html,
    }),

//  ProgressPlugin отображает прогресс компиляции
    new webpack.ProgressPlugin(),

/*  MiniCssExtractPlugin создает CSS файл для каждого JS файла (который использует CSS)
    В то время, как style-loader пишет стили в DOM как инлайн стили
*/
    new MiniCssExtractPlugin({
      chunkFilename: 'css/[name].[contenthash:8].css',
      filename: 'css/[name].[contenthash:8].css',
    }),

    buildDefinePlugin(apiUrl, isDev, project),
  ];

  if (isDev) {
/*  HotModuleReplacementPlugin позволяет применить правки в коде без перезагрузки страницы
    Обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки

    Если 'HotModuleReplacementPlugin' будет работать нестабильно, можно использовать 'react-refresh-webpack-plugin'
    plugins.push(new ReactRefreshWebpackPlugin());

*/  plugins.push(new webpack.HotModuleReplacementPlugin());

//  BundleAnalyzerPlugin позволяет анализировать размер bundle и размеры зависимостей
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false, // не открывать страницу с BundleAnalyzerPlugin при каждом запуске приложения
    }));
  }

  return plugins;
}
