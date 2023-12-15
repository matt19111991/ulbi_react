import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack, { Configuration } from 'webpack';

import { BuildOptions } from './types/types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { analyzer, mode, paths, platform } = options;

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),

    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].[contenthash:8].css',
        filename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
