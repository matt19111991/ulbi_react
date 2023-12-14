import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'development' | 'production';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    devServer: isDev
      ? {
          open: false,
          port: env.port ?? 3000,
        }
      : undefined,
    devtool: isDev && 'inline-source-map',
    entry: path.resolve(__dirname, 'src', 'webpack', 'index.tsx'),
    mode: env.mode ?? 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),

      isDev && new webpack.ProgressPlugin(),

      !isDev &&
        new MiniCssExtractPlugin({
          chunkFilename: 'css/[name].[contenthash:8].css',
          filename: 'css/[name].[contenthash:8].css',
        }),
    ],
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  };

  return config;
};
