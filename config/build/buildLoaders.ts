import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
    const typeScriptLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node-modules/',
    };

    return [ // порядок лоадеров в массиве имеет значение
        typeScriptLoader,
    ];
}
