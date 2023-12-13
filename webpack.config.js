const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, 'src', 'webpack', 'index.ts'),
    mode: env.mode ?? 'development',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),

      new webpack.ProgressPlugin(),
    ],
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
    },
  };
};
