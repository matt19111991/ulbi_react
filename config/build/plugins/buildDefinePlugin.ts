import webpack from 'webpack';

//  DefinePlugin позволяет прокидывать глобальные переменные во всё приложение

export const buildDefinePlugin = (
  apiUrl: string,
  isDev: boolean,
): webpack.WebpackPluginInstance => {
  return new webpack.DefinePlugin({
    __API__: JSON.stringify(apiUrl),
    __IS_DEV__: JSON.stringify(isDev),
  });
};
