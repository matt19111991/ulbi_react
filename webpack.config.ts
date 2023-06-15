// const path = require('path'); // Webpack работает в среде Node.js. Есть доступ к 'path'

// @types/node, @types/webpack и ts-node нужны, чтобы использовать такой формат импортов. Иначе require
// Благодаря модулям и типам выше можно перейти от webpack.config.js к webpack.config.ts

import path from 'path';

// в папку /build будут попадать помимо JS файлов еще и HTML файлы
import HTMLWebpackPlugin from 'html-webpack-plugin';

import webpack from 'webpack';

/*
module.exports = { // аналог экспорта для Node.js
    mode: 'development',
    ...
}
*/

const config: webpack.Configuration = {
    mode: 'development',

/*  entry: {
         first_entry: path.resolve(__dirname, 'src', 'index1.js'), // несколько entry points
         second_entry: path.resolve(__dirname, 'src', 'index2.js')
    },
*/
    entry: path.resolve(__dirname, 'src', 'index.ts'), // стартовая точка приложения

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node-modules/',
            }
        ],
    },
    resolve: {
/*      при импорте файлов с этими расширениями, можно указывать только название файла (component.tsx => component):
        import Component from './component';
*/      extensions: ['.tsx', '.ts', '.js'],
    },
    output: { // настройка конечной сборки
/*      [name] для динамических названий (для кеширования уже загруженных файлов)

        [contenthash] - уникальный хэш. Браузер кеширует файлы с одинаковыми именами.
        Если будут изменения в закешированных файлах, то
        при сборке поменяется хэш и сгенерируется новое имя файла
*/      filename: '[name].[contenthash].js',

//      __dirname - папка, где находимся в данный момент. В текущем случае: корень
        path: path.resolve(__dirname, 'build'),

        clean: true, // очистка ненужных файлов (например: файлов, в которых поменялся хэш)
    },
    plugins: [
        new HTMLWebpackPlugin({
/*          без опции 'template' в файле ./build/index.html не будет <div class='root'></div>
            указывает шаблон из папки ./public/index.html для файла ./build/index.html
*/          template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new webpack.ProgressPlugin(),
    ]
}

export default config;
