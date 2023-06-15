import webpack from 'webpack';

// плагин, чтобы в папку /build попадали помимо JS файлов еще и HTML файлы
import HTMLWebpackPlugin from 'html-webpack-plugin';

import { BuildOptions } from './types/config';

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
/*          без опции 'template' в файле ./build/index.html не будет <div class='root'></div>
            указывает шаблон из папки ./public/index.html для файла ./build/index.html
*/
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
    ]
}
