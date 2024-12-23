import type { Configuration } from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import type { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { isDev, mode, paths } = options;

  return {
    /*
      из 'React v.19' был удален метод 'findDOMNode', а библиотека
     'react-virtualized' устарела и обновляться до этой версии 'Reacta'
      не будет, поэтому игнорируем предупреждения об этом
     */
    ignoreWarnings: [
      {
        message: /export 'findDOMNode' \(imported as (.*)\) was not found in 'react-dom'/,
        module: /react-virtualized/,
      },
    ],

    mode,

/*  entry: {
      first_entry:  path.resolve(__dirname, 'src', 'index1.js'), // несколько 'entry points'
      second_entry: path.resolve(__dirname, 'src', 'index2.js'),
    },

*/  entry: paths.entry, // стартовая точка приложения

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    devServer: isDev ? buildDevServer(options) : undefined,

    devtool: isDev // 'source-maps' (карты исходного кода) нужны для отладочной информации в бандле
      ? 'eval-cheap-module-source-map' // 'build slow, rebuild fast' - 'best practice'
      : false, // в 'production' нужно отключать 'source-map' для минимизации кода

    output: { // настройка конечной сборки
/*    при использовании статичного названия ('build.js') файл билда будет кэшироваться;
      браузером не будут подтягиваться новые изменения в файле

      [name] для динамических названий (для кэширования уже загруженных файлов)

      [contenthash] - уникальный хэш. Браузер кэширует файлы с одинаковыми именами.
      Если будут изменения в закэшированных файлах, то
      при сборке поменяется хэш и сгенерируется новое имя файла
*/    filename: '[name].[contenthash].js',

      path: paths.build,

//    очистка ненужных файлов (файлов, в которых поменялся хэш или файлов с предыдущей сборки)
      clean: true,

/*    Все статические файлы должны запрашиваться из корня (/build), иначе ломаются роуты вида '/articles/:id'
      publicPath('/') => корень '/build' + '/'

      В 'development' режиме папки '/build' нет, как и папки '/articles', все хранится в памяти
*/    publicPath: '/',
    },

    plugins: buildPlugins(options),
  };
}
