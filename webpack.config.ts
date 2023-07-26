// const path = require('path'); // Webpack работает в среде Node.js. Есть доступ к 'path'

/* @types/node, @types/webpack и ts-node нужны,
   чтобы использовать такой формат импортов. Иначе require

   Благодаря модулям и типам выше можно перейти от webpack.config.js к webpack.config.ts
*/ import path from 'path';

import dotenv from 'dotenv';
import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

dotenv.config({ path: './.env' }); // используем переменные из '.env' файла

/*
module.exports = { // аналог экспорта для Node.js
    mode: 'development',
    ...
}
*/

// export default config; // если не нужны переменные окружения env, можно вернуть просто config

export default (env: BuildEnv) => {
  const dotEnvVars = dotenv.config().parsed; // извлекам переменные из '.env' файла
  console.log('dotEnvVars', dotEnvVars);
  console.log('process.env', process.env);

  const apiUrl = dotEnvVars?.API_URL || 'http://localhost:8000';

  const mode: BuildMode = env.mode || 'development';

  const isDev = mode === 'development';

  const paths: BuildPaths = {
    // __dirname - папка, где находимся в данный момент. В текущем случае: корень

    build: path.resolve(__dirname, 'build'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    src: path.resolve(__dirname, 'src'),
  };

  const port = env.port || 3000;

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
