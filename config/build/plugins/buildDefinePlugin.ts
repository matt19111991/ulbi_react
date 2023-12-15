import webpack from 'webpack';
/*
  DefinePlugin позволяет прокидывать глобальные переменные во всё приложение
  Значения переменных задаются на этапе сборки (компиляции)

  При помощи метода 'webpack.DefinePlugin.runtimeValue' можно устанавливать зависимость от файлов,
  при изменении файлов будут пересчитываться значения переменных
*/
export const buildDefinePlugin = (
  apiUrl: string,
  isDev: boolean,
  project: 'front-end' | 'jest' | 'storybook',
): webpack.WebpackPluginInstance => {
  return new webpack.DefinePlugin({ // должна быть консистентность с 'global.d.ts'
    __API__: JSON.stringify(apiUrl),
    __IS_DEV__: JSON.stringify(isDev),
    __PROJECT__: JSON.stringify(project), // без JSON.stringify() будет ошибка в приложении: 'front-end is not defined'
  });
};
