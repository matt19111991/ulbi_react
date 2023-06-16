import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        use: [ // cssLoaders работают в определенном порядке:
            'style-loader', // 3. создает стили из JS строк и помещает их DOM
            'css-loader',   // 2. преобразовывает CSS в JS (CommonJS)
            'sass-loader',  // 1. компилирует SASS в CSS
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
