import { DefinePlugin } from 'webpack';
import type { WebpackPluginInstance } from 'webpack';
/*
 'DefinePlugin' позволяет прокидывать глобальные переменные во всё приложение,
  значения переменных задаются на этапе сборки (компиляции)

  при помощи метода 'webpack.DefinePlugin.runtimeValue' можно устанавливать зависимость от файлов,
  при изменении файлов будут пересчитываться значения переменных
*/
export const buildDefinePlugin = (
  apiUrl: string,
  isDev: boolean,
  project: 'front-end' | 'jest' | 'storybook',
  vapidKey: string,
): WebpackPluginInstance => {
  return new DefinePlugin({ // должна быть консистентность с 'src/app/types/global.d.ts'
//    без 'JSON.stringify()' будет ошибка в приложении: 'front-end is not defined'
    __API__: JSON.stringify(apiUrl),
    __IS_DEV__: JSON.stringify(isDev),
    __PROJECT__: JSON.stringify(project),
    __VAPID_KEY__: JSON.stringify(vapidKey),
  });
};
