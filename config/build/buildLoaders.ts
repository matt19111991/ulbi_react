import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
/*
    'babel-loader' нужно использовать для корретной работы React / JSX
    сейчас это покрывается 'ts-loader'
*/

    const babelLoader = buildBabelLoader();

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
