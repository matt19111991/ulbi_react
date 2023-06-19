import webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { isDev, mode, paths } = options;

    return {
        mode,

/*      entry: {
             first_entry:  path.resolve(__dirname, 'src', 'index1.js'), // несколько entry points
             second_entry: path.resolve(__dirname, 'src', 'index2.js'),
        },

*/      entry: paths.entry, // стартовая точка приложения

        module: {
            rules: buildLoaders(options),
        },

        resolve: buildResolvers(),

        devServer: isDev ? buildDevServer(options) : undefined,

//      В production нужно отключать source-map для минимизации кода
        devtool: isDev ? 'inline-source-map' : undefined,

        output: { // настройка конечной сборки
/*          [name] для динамических названий (для кеширования уже загруженных файлов)

            [contenthash] - уникальный хэш. Браузер кеширует файлы с одинаковыми именами.
            Если будут изменения в закешированных файлах, то
            при сборке поменяется хэш и сгенерируется новое имя файла
*/          filename: '[name].[contenthash].js',

            path: paths.build,

            clean: true, // очистка ненужных файлов (например: файлов, в которых поменялся хэш)
        },

        plugins: buildPlugins(options),
    }
}
