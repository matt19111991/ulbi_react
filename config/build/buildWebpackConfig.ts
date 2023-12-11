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

/*  entry: {
      first_entry:  path.resolve(__dirname, 'src', 'index1.js'), // несколько entry points
      second_entry: path.resolve(__dirname, 'src', 'index2.js'),
    },

*/  entry: paths.entry, // стартовая точка приложения

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    devServer: isDev ? buildDevServer(options) : undefined,

    devtool: isDev
      ? 'eval-cheap-module-source-map' // build slow, rebuild fast - best practice
      : undefined, // в production нужно отключать source-map для минимизации кода

    output: { // настройка конечной сборки
/*    при использовании статичного названия ('build.js') файл билда будет кешироваться,
      браузером не будут подтягиваться новые изменения в файле

      [name] для динамических названий (для кеширования уже загруженных файлов)

      [contenthash] - уникальный хэш. Браузер кеширует файлы с одинаковыми именами.
      Если будут изменения в закешированных файлах, то
      при сборке поменяется хэш и сгенерируется новое имя файла
*/    filename: '[name].[contenthash].js',

      path: paths.build,

//    очистка ненужных файлов (файлов, в которых поменялся хэш или файлов с предыдущей сборки)
      clean: true,

/*    Все статические файлы должны запрашиваться из корня (/build), иначе
      ломаются роуты вида '/articles/:id'. publicPath('/') => корень '/build' + '/'

      В dev режиме папки '/build' нет, как и папки '/articles', все хранится в памяти
*/    publicPath: '/',
    },

    plugins: buildPlugins(options),
  };
}
