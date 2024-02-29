import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import type { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        client: {
          // выключаем отображение экрана об ошибке, поставляемого 'webpack-dev-server'
          overlay: false,
        },

/*      Идет проксирование через '/' (главную) страницу (у нас 'SPA' с одним 'index.html')
        Иначе, если обновить страницу '/about', будет 'Cannot GET /about'
*/      historyApiFallback: true,

        hot: true, // 'HMR' режим включен (достаточно для чистого 'JS'/'TS', но недостаточно для 'React')

        port: options.port,

        open: false, // 'open: true' автоматически открывает страницу при запуске сервера
    };
}
