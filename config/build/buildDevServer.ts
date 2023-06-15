import { BuildOptions } from './types/config';

interface DevServerConfiguration { // не подтягивается тип Configuration из webpack-dev-server
    port: number;
    open?: boolean;
}

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true, // автоматически открывает страницу при запуске сервера
    };
}
