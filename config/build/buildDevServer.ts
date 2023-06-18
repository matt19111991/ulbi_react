import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
/*      Идет проксирование через '/' (главную) страницу (у нас SPA с одним index.html)
        Иначе, если обновить страницу '/about', будет 'Cannot GET /about'
*/      historyApiFallback: true,

        port: options.port,
        open: false, // 'open: true' автоматически открывает страницу при запуске сервера
    };
}
