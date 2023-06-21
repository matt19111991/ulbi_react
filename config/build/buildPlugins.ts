import webpack from 'webpack';

// плагин, чтобы в папку /build попадали помимо JS файлов еще и HTML файлы
import HTMLWebpackPlugin from 'html-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BuildOptions } from './types/config';

export function buildPlugins({ isDev, paths }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [ // порядок плагинов не имеет значения
        new HTMLWebpackPlugin({
/*          без опции 'template' в файле ./build/index.html не будет <div class='root'></div>
            указывает шаблон из папки ./public/index.html для файла ./build/index.html
*/
            template: paths.html,
        }),

        new webpack.ProgressPlugin(),

/*      MiniCssExtractPlugin создает CSS файл для каждого JS файла (который использует CSS)
        В то время, как style-loader пишет стили в DOM как инлайн стили
*/
        new MiniCssExtractPlugin({
            chunkFilename: 'css/[name].[contenthash:8].css',
            filename: 'css/[name].[contenthash:8].css',
        }),

//      DefinePlugin позволяет прокидывать глобальные переменные во всё приложение
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
    ];
}
