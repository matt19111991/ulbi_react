import webpack from 'webpack';

import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
/*
    'babel-loader' нужно использовать для корретной работы React / JSX
    сейчас это покрывается 'ts-loader'
*/

    const babelLoader = {
        test: /\.(js|jsx|ts|tsx)/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
//              должна быть консистентность между 'buildLoaders' в webpack и 'babel.config.json

                plugins: [
                    [
/*                      babel-plugin-i18next-extract извлекает все ключи переводов при сборке и
                        сохраняет в виде JSON по пути '<root>/extractedTranslations/'

                        обновляет переводы новыми значениями в runtime (во время запущенной сборки)
*/
                        'i18next-extract',
                        { // i18next-extract options
                            locales: ['ru', 'en'],

                         /* 'value' в переводах ("key": "value") по умолчанию будет равно 'key':
                             value = key
                         */ keyAsDefaultValue: true,
                        },
                    ],
                ],

//              настройки для преобразования новых стандартов в старые (поддержка старых браузеров)
                presets: ['@babel/preset-env'],

/*              для React / JSX (без 'ts-loader')
                presets: ['@babel/preset-env', '@babel/preset-react'],
*/
            },
        },
    };

    const cssLoaders = buildCssLoader(options.isDev);

    const fileLoader = {
/*      если нужно будет добавить обработку шрифтов,
        достаточно расширить регулярку "/\.(png|jpe?g|gif|woff)$/i"
*/      test: /\.(png|jpe?g|gif)$/i, // обрабатывает только PNG, JPG, JPEG и GIF изображения
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const svgLoader = buildSvgLoader();

//  ts-loader умеет обрабатывать JSX. Для нативного JS нужен дополнительно babel-loader
    const typeScriptLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node-modules/',
    };

    return [ // порядок лоадеров в массиве имеет значение
        fileLoader,
        svgLoader,
        babelLoader, // должен идти выше typeScriptLoader
        typeScriptLoader,
        cssLoaders,
    ];
}
