import type { Configuration } from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): Configuration {
  const { mode, paths } = options;

  const isDev = mode === 'development';

  return {
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev && 'inline-source-map',
    entry: paths.entry,
    mode: mode,
    module: {
      rules: buildLoaders(options),
    },
    plugins: buildPlugins(options),
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      path: paths.output,
    },
    resolve: buildResolvers(options),
  };
}
