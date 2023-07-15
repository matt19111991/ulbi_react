import webpack from 'webpack';

export const buildBabelLoader = (/* isDev: boolean */): webpack.RuleSetRule => ({
  test: /\.(js|jsx|ts|tsx)/,
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
/*       Если 'HotModuleReplacementPlugin' будет работать нестабильно,
         можно использовать 'react-refresh-webpack-plugin':
*/       // isDev && require.resolve('react-refresh/babel'),
      ], // .filter(Boolean), // фильтр для 'react-refresh-webpack-plugin'

//    настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
      presets: ['@babel/preset-env'],

/*    для React / JSX (без 'ts-loader')
      presets: ['@babel/preset-env', '@babel/preset-react'],
*/
    },
  },
});
