import webpack from 'webpack';

//  DefinePlugin позволяет прокидывать глобальные переменные во всё приложение

export const buildDefinePlugin = (isDev: boolean): webpack.WebpackPluginInstance => {
  return new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev),
  });
};
