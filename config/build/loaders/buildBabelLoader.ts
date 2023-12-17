import webpack from 'webpack';

import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';

// для работы 'babel-loader' нужно установить '@babel/core' библиотеку

/*
  'babel.config.json' файл vs buildBabelLoader для 'Webpack'
  - используем что-то одно, нет смысла дублировать настройки
  - если в проекте не используется 'Webpack', то все настройки для 'babel-loader' задаются в 'babel.config.json'
  - для 'Jest' среды настройки 'babel-loader' выносятся в 'babel.config.json'
*/

// TODO: перенести все options в 'babel.config.json' файл

export const buildBabelLoader = (isTsx?: boolean, isDev?: boolean): webpack.RuleSetRule => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true, // разрешаем кеширование

      plugins: [
        [
/*        babel-plugin-i18next-extract:
          - извлекает все ключи переводов при сборке и сохраняет их в виде JSON по пути '<root>/extractedTranslations/'
          - обновляет переводы новыми значениями в runtime (во время запущенной сборки)
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
          { isTsx }, // отвечает за парсинг .tsx
        ],

/*      смотрит код на наличие ES6 фич и если они есть, трансформирует код так,
        чтобы эти фичи брались не из глобального скоупа, а импортировались из 'babel-runtime'
*/      '@babel/plugin-transform-runtime',

        isTsx && !isDev && [
          babelRemovePropsPlugin, // для '.tsx' удаляем все 'data-testid' из финальной сборки
          {
            props: ['data-testid'],
          },
        ],

/*      TODO: перейти на 'react-refresh-webpack-plugin' (нужны дополнительные настройки для 'babel-loader')
        isDev && require.resolve('react-refresh/babel'),
*/     ].filter(Boolean), // отфильтровываем неактивные плагины

//    настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
      presets: [
        '@babel/preset-env', // позволяет использовать новейшие функции JS
        '@babel/preset-typescript', // для поддержки TS
        [
          '@babel/preset-react', // для поддержки JSX
          { // без этой опции получаем ошибку: 'ReferenceError: React is not defined'
            runtime: isDev ? 'automatic' : 'classic',
          },
        ],
      ],
/*
      presets: ['@babel/preset-env', '@babel/preset-react'], // для React / JSX (без 'ts-loader'):
*/ },
  },
});
