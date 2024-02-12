// плагин выносит 'CSS' в отдельные файлы, это позволяет кэшировать 'CSS' и избавиться от 'Flash of Unstyled Content'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import webpack from 'webpack';

export const buildCssLoader = (isDev: boolean): webpack.RuleSetRule => {
  const styleLoader = isDev
    ? 'style-loader'               // 3. внедряет стили (по умолчанию через теги '<style />') в 'DOM'
    : MiniCssExtractPlugin.loader; // 3. стили выносятся в отдельные файлы

  const cssLoader = { // 2. преобразовывает 'CSS' в 'JS' ('CommonJS'):
    loader: 'css-loader',                         //    - @import 'style.css' => require('./style.css')
    options: {                                    //    - url(image.png) => require('./image.png')
      modules: { // настройки 'CSS-modules'
//      'css-loader' применяем только для файлов '*.module.*', в остальных случаях 'CSS' файлы обрабатываются как обычно
        auto: (resourcePath: string) => resourcePath.includes('.module.'),

        localIdentName: isDev
/*        для удобства отладки:     path      name     local  hash
                                     |          |        |      |
                            V----V---V---V V----V---V    V      V
             <h1 className='src-components-App-module__title--pDE3u'>Title</h1>
*/        ? '[path][name]__[local]--[hash:base64:5]'

          : '[hash:base64:8]', // <h1 className='pDE3uX9A'>Title</h1>
      },
    },
  };

  const sassLoader = 'sass-loader'; // 1. компилирует 'SASS'/'SCSS' в 'CSS':
/*                                                      .test {
                                                          &.custom {
                                                            &.extend {
                                                              display: none; => .test.custom.extend{display:none}
                                                            }
                                                          }
                                                        }
*/
  return { // 'cssLoaders' работают в определенном порядке: 1 => 2 => 3
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      styleLoader,

/*    loader можно задавать строкой:
      'css-loader'

      или объектом:
*/    cssLoader,

      sassLoader,
    ],
  };
};
