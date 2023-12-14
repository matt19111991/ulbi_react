import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { ModuleOptions } from 'webpack';

import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  };

  const tsLoader =  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  };

  return [tsLoader, scssLoader];
}
