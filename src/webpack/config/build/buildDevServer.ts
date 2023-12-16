import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    historyApiFallback: true,
    hot: true,
    open: false,
    port: options.port
  };
}
