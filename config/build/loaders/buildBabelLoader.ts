import webpack from 'webpack';

import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';

// для работы 'babel-loader' нужно установить '@babel/core' библиотеку

/*
 'babel.config.json' или 'babel.config.ts' файлы vs 'buildBabelLoader' для 'Webpack':
  - используем что-то одно, нет смысла дублировать настройки
  - если в проекте не используется 'Webpack', то все настройки для 'babel-loader' задаются в
    'babel.config.json' или в 'babel.config.ts'
  - для 'Jest' среды настройки 'babel-loader' выносятся в 'babel.config.json' или 'babel.config.ts'
*/

export const buildBabelLoader = (isTsx?: boolean, isDev?: boolean): webpack.RuleSetRule => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
//    для корректной работы 'babelRemovePropsPlugin' нужно отключить кэширование
      cacheDirectory: true, // разрешаем кэширование

      plugins: [
        [
/*        'babel-plugin-i18next-extract':
          - извлекает все ключи переводов при сборке и сохраняет их в виде 'JSON' по пути:
            '<root>/extractedTranslations/'
          - обновляет переводы новыми значениями в 'runtime' (во время запущенной сборки)
*/
          'i18next-extract',
          { // i18next-extract options
            locales: ['ru', 'en'],

/*          'value' в переводах ("key": "value") по умолчанию будет равно 'key':
            value = key
*/          keyAsDefaultValue: true,
          },
        ],

        [
          '@babel/plugin-transform-typescript',
          { isTsx }, // отвечает за парсинг '.tsx'
        ],
/*
        смотрит код на наличие 'ES6' фич и, если они есть, трансформирует код так,
        чтобы эти фичи брались не из глобального скоупа, а импортировались из 'babel-runtime'

        плагин позволяет повторно использовать внедренный вспомогательный код 'Babel' для экономии размера кода
*/      '@babel/plugin-transform-runtime',

        isTsx && !isDev && [
//        для корректной работы нужно отключить кэширование
          babelRemovePropsPlugin, // для '.tsx' удаляем все 'data-testid' из финальной сборки
          {
            props: ['data-testid'],
          },
        ],

/*      '@pmmmwh/react-refresh-webpack-plugin' позволяет применить правки в коде без перезагрузки страницы;
        обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки

        необходимо свойство 'overrides' в 'package.json' с указанием последней версии 'webpack-dev-server',
        т.к. '@pmmmwh/react-refresh-webpack-plugin' работает только с 'webpack-dev-server' v.4.x

        isDev && require.resolve('react-refresh/babel'),
*/     ].filter(Boolean), // отфильтровываем неактивные плагины

//    настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
      presets: [
        '@babel/preset-env', // позволяет использовать новейшие функции 'JS'
        '@babel/preset-typescript', // для поддержки 'TS'
        [
          '@babel/preset-react', // для поддержки 'JSX'
          { /*
              без этой опции получаем ошибку: 'ReferenceError: React is not defined',
              для 'production' сборки также оставляем 'automatic' режим, иначе получим ошибку выше
            */
            runtime: 'automatic',
          },
        ],
      ],
/*
      presets: ['@babel/preset-env', '@babel/preset-react'], // для 'React'/'JSX' (без 'ts-loader'):
*/ },
  },
});
