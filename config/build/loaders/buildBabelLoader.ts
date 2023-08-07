import webpack from 'webpack';

import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';

export const buildBabelLoader = (isTsx?: boolean/* ,isDev: boolean, */): webpack.RuleSetRule => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
//    должна быть консистентность между 'buildLoaders' в webpack и 'babel.config.json

      plugins: [
        [
/*        babel-plugin-i18next-extract извлекает все ключи переводов при сборке и
          сохраняет в виде JSON по пути '<root>/extractedTranslations/'

          обновляет переводы новыми значениями в runtime (во время запущенной сборки)
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

//      для '.tsx' удаляем все 'data-testid' из финальной сборки
        isTsx && [
          babelRemovePropsPlugin,
          {
            props: ['data-testid'],
          },
        ],

/*       Если 'HotModuleReplacementPlugin' будет работать нестабильно,
         можно использовать 'react-refresh-webpack-plugin':
*/       // isDev && require.resolve('react-refresh/babel'),
      ].filter(Boolean), // отфильтровываем неактивные плагины

//    настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
          '@babel/preset-react', {
            runtime: 'automatic',
          },
        ],
      ],

/*    для React / JSX (без 'ts-loader')
      presets: ['@babel/preset-env', '@babel/preset-react'],
*/
    },
  },
});
