import webpack from 'webpack';

import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;

    return {
        mode,

/*      entry: {
             first_entry: path.resolve(__dirname, 'src', 'index1.js'), // несколько entry points
             second_entry: path.resolve(__dirname, 'src', 'index2.js')
        },

*/      entry: paths.entry, // стартовая точка приложения

        module: {
            rules: buildLoaders(),
        },

        resolve: buildResolvers(),

        output: { // настройка конечной сборки
/*          [name] для динамических названий (для кеширования уже загруженных файлов)

            [contenthash] - уникальный хэш. Браузер кеширует файлы с одинаковыми именами.
            Если будут изменения в закешированных файлах, то
            при сборке поменяется хэш и сгенерируется новое имя файла
*/          filename: '[name].[contenthash].djs',

            path: paths.build,

            clean: true, // очистка ненужных файлов (например: файлов, в которых поменялся хэш)
        },

        plugins: buildPlugins(options),
    }
}
