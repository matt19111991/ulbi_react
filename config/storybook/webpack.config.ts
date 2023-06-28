import path from 'path';
import webpack from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

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

/* отключение обработки SVG файлов через дефолтные лоадеры storybook-a ('file-loader') и
   подключение '@svgr/webpack' лоадера
*/
  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module.rules.map((rule: webpack.RuleSetRule) => {
    if (/svg/.test(rule.test as string)) { // если в поле 'test' для лоадера есть совпадение по 'svg'
      return { ...rule, exclude: /\.svg$/i }; // исключаем обработку SVG файлов
    }

    return rule;
  });

  config.module.rules.push(buildSvgLoader()); // подключение '@svgr/webpack' лоадера

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