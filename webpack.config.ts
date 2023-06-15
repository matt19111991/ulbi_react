// const path = require('path'); // Webpack работает в среде Node.js. Есть доступ к 'path'

// @types/node, @types/webpack и ts-node нужны, чтобы использовать такой формат импортов. Иначе require
// Благодаря модулям и типам выше можно перейти от webpack.config.js к webpack.config.ts

import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildMode, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
    // __dirname - папка, где находимся в данный момент. В текущем случае: корень

    build: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    html: path.resolve(__dirname, 'public', 'index.html'),
}

const mode: BuildMode = 'development';
const isDev = mode === 'development';

const config: webpack.Configuration = buildWebpackConfig({
    isDev,
    mode,
    paths,
});

/*
module.exports = { // аналог экспорта для Node.js
    mode: 'development',
    ...
}
*/

export default config;
