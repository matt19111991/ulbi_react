// const path = require('path'); // 'Webpack' работает в среде 'Node.js'. Есть доступ к 'path'

/*
  '@types/node', '@types/webpack' и 'ts-node' нужны, чтобы использовать 'ES6 модули', иначе 'require'

  Благодаря модулям и типам выше можно перейти от 'webpack.config.js' к 'webpack.config.ts'
*/
import dotenv from 'dotenv';
import path from 'path';
import type { Configuration } from 'webpack';

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
    buildAssets: path.resolve(__dirname, 'build', 'assets'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    favicon: path.resolve(__dirname, 'src', 'shared', 'assets', 'favicon.ico'),
    googleVerification: path.resolve(__dirname, 'google0ba6d230b9204219.html'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    manifest: path.resolve(__dirname, 'public', 'manifest.json'),
    manifestAssets: path.resolve(__dirname, 'public', 'assets'),
    robots: path.resolve(__dirname, 'robots.txt'),
    serviceWorker: path.resolve(__dirname, 'public', 'service-worker.js'),
    sitemapIndex: path.resolve(__dirname, 'sitemap.xml'),
    sitemap1: path.resolve(__dirname, 'sitemap-1.xml'),
    sitemap2: path.resolve(__dirname, 'sitemap-2.xml'),
    src: path.resolve(__dirname, 'src'),
  };

  const port = env?.port || 3000;

  const config: Configuration = buildWebpackConfig({
    apiUrl,
    isDev,
    mode,
    paths,
    port,
    project: 'front-end',
  });

  return config;
};
