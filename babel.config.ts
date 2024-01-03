import webpack from 'webpack';

import babelRemovePropsPlugin from './config/build/babel/babelRemovePropsPlugin';

/*
  'babel.config.json' vs 'babel.config.ts' vs buildBabelLoader для 'Webpack'
  используем что-то одно, нет смысла дублировать настройки
*/
export default function config(isTsx?: boolean, isDev?: boolean): webpack.RuleSetRule {
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true, // разрешаем кеширование

        plugins: [
          [
            /*
              babel-plugin-i18next-extract:
              - извлекает все ключи переводов при сборке и сохраняет их в виде JSON по пути
                '<root>/extractedTranslations/'
              - обновляет переводы новыми значениями в runtime (во время запущенной сборки)
            */
            'i18next-extract',
            {
              // i18next-extract options
              locales: ['ru', 'en'],

              /*
                'value' в переводах ("key": "value") по умолчанию будет равно 'key':
                value = key
              */
              keyAsDefaultValue: true,
            },
          ],

          [
            '@babel/plugin-transform-typescript',
            { isTsx }, // отвечает за парсинг .tsx
          ],

          /*
            смотрит код на наличие ES6 фич и если они есть, трансформирует код так,
            чтобы эти фичи брались не из глобального скоупа, а импортировались из 'babel-runtime'
          */
          '@babel/plugin-transform-runtime',

          isTsx &&
            !isDev && [
              babelRemovePropsPlugin, // для '.tsx' удаляем все 'data-testid' из финальной сборки
              {
                props: ['data-testid'],
              },
            ],

          /*
            'react-refresh-webpack-plugin' позволяет применить правки в коде без перезагрузки страницы
            Обеспечивает более стабильную работу, чем функционал 'webpack-dev-server' из коробки
            isDev && require.resolve('react-refresh/babel'),
          */
        ].filter(Boolean), // отфильтровываем неактивные плагины

        // настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
        presets: [
          '@babel/preset-env', // позволяет использовать новейшие функции JS
          '@babel/preset-typescript', // для поддержки TS
          [
            '@babel/preset-react', // для поддержки JSX
            {
              // без этой опции получаем ошибку: 'ReferenceError: React is not defined'
              runtime: 'automatic',
            },
          ],
        ],

        // presets: ['@babel/preset-env', '@babel/preset-react'], // для React / JSX (без 'ts-loader'):
      },
    },
  };
}
