import path from 'path';
import webpack from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';

import { BuildPaths } from '../build/types/config';

/*
  отдельный webpack.config для storybook, чтобы была возможность
    - использовать относительные пути
    - не указывать расширения файлов
    - использовать CSS модули
*/

export default ({ config }: { config: webpack.Configuration }) => {
  // настройка CSS модулей
  config.module.rules.push(buildCssLoader(true)); // storybook используем только в режиме разработки

  // убираем указание расширения файлов
  config.resolve.extensions.push('.ts', '.tsx');

  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'), // единственный важный путь
  };

  // задаем относительные пути
  config.resolve.modules.push(paths.src);

  return config;
};
