// const path = require('path'); // Webpack работает в среде Node.js. Есть доступ к 'path'

/* @types/node, @types/webpack и ts-node нужны,
   чтобы использовать такой формат импортов. Иначе require

   Благодаря модулям и типам выше можно перейти от webpack.config.js к webpack.config.ts
*/ import path from 'path';

import webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

/*
module.exports = { // аналог экспорта для Node.js
    mode: 'development',
    ...
}
*/

// export default config; // если не нужны переменные окружения env, можно вернуть просто config

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        // __dirname - папка, где находимся в данный момент. В текущем случае: корень

        build: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode: BuildMode = env.mode || 'development';
    const isDev = mode === 'development';

    const port = env.port || 3000;

    const config: webpack.Configuration = buildWebpackConfig({
        isDev,
        mode,
        paths,
        port,
    });

    return config;
};
