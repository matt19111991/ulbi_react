import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export const buildCssLoader = (isDev: boolean): webpack.RuleSetRule => ({
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [ // cssLoaders работают в определенном порядке:
      isDev
        ? 'style-loader'               // 3. создает стили в виде JS строк и помещает их финальный бандл
        : MiniCssExtractPlugin.loader, // 3. стили выносятся в отдельные файлы
/*
      loader можно задавать строкой: 'css-loader'
      или объектом:
*/    {
        loader: 'css-loader', // 2. преобразовывает CSS в JS (CommonJS)
//      @import 'style.css' => require('./style.css') | url(image.png) => require('./image.png')

        options: {
          modules: {
/*          css-loader применяем только для файлов '*.module.*',
            в остальных случаях CSS файлы обрабатываются как обычно
*/          auto: (resPath: string) => resPath.includes('.module.'),

            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]' // для удобства отладки
              : '[hash:base64:8]',
          },
        },
      },

      'sass-loader', // 1. компилирует SASS/SCSS в CSS

/*     .test {
          &.custom {
            &.extend {
              display: none; => .test.custom.extend{display:none}
            }
          }
       }
*/
    ],
});
