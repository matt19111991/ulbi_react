import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

type Mode = 'development' | 'production';

interface EnvVariables {
  mode: Mode;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    entry: path.resolve(__dirname, 'src', 'webpack', 'index.ts'),
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
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  };

  return config;
};
