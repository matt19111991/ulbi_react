import path from 'path';
import webpack from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

import { buildDefinePlugin } from '../build/plugins/buildDefinePlugin';

import { BuildPaths } from '../build/types/config';

/*
  отдельный webpack.config для storybook, чтобы была возможность
    - использовать относительные пути
    - не указывать расширения файлов
    - использовать CSS модули
*/

type Rule = webpack.RuleSetRule | string | 0 | false | undefined | null;

export default ({ config }: { config: webpack.Configuration }) => {
  // настройка CSS модулей
  config.module!.rules!.push(buildCssLoader(true)); // storybook используем только в режиме разработки

/* отключение обработки SVG файлов через дефолтные лоадеры storybook-a ('file-loader') и
   подключение '@svgr/webpack' лоадера
*/
  // eslint-disable-next-line no-param-reassign
  config.module!.rules = config.module!.rules!.map((rule: Rule) => {
    const iteratedRule = rule as webpack.RuleSetRule;

    if (/svg/.test(iteratedRule.test as string)) { // если в поле 'test' для лоадера есть совпадение по 'svg'
      return { ...iteratedRule, exclude: /\.svg$/i }; // исключаем обработку SVG файлов
    }

    return iteratedRule;
  });

  config.module!.rules!.push(buildSvgLoader()); // подключение '@svgr/webpack' лоадера

  const paths: BuildPaths = {
    build: '',
    buildLocales: '',
    entry: '',
    html: '',
    locales: '',
    src: path.resolve(__dirname, '..', '..', 'src'), // единственный важный путь
  };

  // плагины

  // storybook используем только в режиме разработки, API не используем
  const plugins = [buildDefinePlugin('', true, 'storybook')];

  config.plugins!.push(...plugins);

/*
  Иначе ошибка: 'Module not found: Error: Package path ./Counter is not exported from package
   ../../entities (see exports field in /home/../../entities/package.json)'
*/
  config.resolve!.alias = {
    entities: path.resolve(paths.src, 'entities'),
  };

  // убираем указание расширения файлов
  config.resolve!.extensions!.push('.ts', '.tsx');

  // задаем относительные пути
  config.resolve!.modules!.push(paths.src);

  return config;
};
