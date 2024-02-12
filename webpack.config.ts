// const path = require('path'); // 'Webpack' работает в среде 'Node.js'. Есть доступ к 'path'

/*
  '@types/node', '@types/webpack' и 'ts-node' нужны, чтобы использовать 'ES6 модули', иначе 'require'

  Благодаря модулям и типам выше можно перейти от 'webpack.config.js' к 'webpack.config.ts'
*/
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

// используем переменные из '.env' файла; будут доступны в 'process.env.API_URL'
dotenv.config({ path: './.env' });

/*
  module.exports = { // аналог 'CommonJS' экспорта
    mode: 'development',
    ...
  }
*/

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
  if (apiUrl) {
    return apiUrl;
  }

  if (mode === 'production') {
    return '/api';
  }

  return 'http://localhost:8000';
};

// export default config; // если не нужны переменные окружения 'env', можно вернуть просто 'config'

/*
  'env' переменные передаются при запуске 'npm' команды:
  'webpack serve --env port=3000 --env mode=development
*/
export default (env: BuildEnv) => {
  const mode: BuildMode = env?.mode || 'development';
  const isDev = mode === 'development';

  const apiUrl = getApiUrl(mode, process.env?.API_URL);

  const paths: BuildPaths = {
    // __dirname - папка, где находимся в данный момент. В текущем случае: корень

    build: path.resolve(__dirname, 'build'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    favicon: path.resolve(__dirname, 'src', 'shared', 'assets', 'favicon.ico'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    src: path.resolve(__dirname, 'src'),
  };

  const port = env?.port || 3000;

  const config: webpack.Configuration = buildWebpackConfig({
    apiUrl,
    isDev,
    mode,
    paths,
    port,
    project: 'front-end',
  });

  return config;
};
