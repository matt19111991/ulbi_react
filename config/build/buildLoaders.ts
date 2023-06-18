import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        use: [ // cssLoaders работают в определенном порядке:
            options.isDev
                ? 'style-loader'               // 3. создает стили из JS строк и помещает их DOM
                : MiniCssExtractPlugin.loader, // 3. стили выносятся в отдельные файлы
            {
                loader: 'css-loader', // loader может быть как объектом, так и строкой
                options: {
                    modules: {
/*                      css-loader применяем только для файлов '*.module.*',
                        в остальных случаях CSS файлы обрабатываются как обычно
*/                      auto: (resPath: string) => resPath.includes('.module.'),

                        localIdentName: options.isDev
                            ? '[path][name]__[local]--[hash:base64:5]' // для удобства отладки
                            : '[hash:base64:8]',

                    },
                }
            },

            // 'css-loader', // 2. преобразовывает CSS в JS (CommonJS)
            'sass-loader',   // 1. компилирует SASS в CSS
        ],
    };

//  ts-loader умеет обрабатывать JSX. Для нативного JS нужен дополнительно babel-loader
    const typeScriptLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node-modules/',
    };

    return [ // порядок лоадеров в массиве имеет значение
        typeScriptLoader,
        cssLoaders,
    ];
}
