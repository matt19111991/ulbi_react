import type { Configuration } from 'webpack';

import { BuildOptions } from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    alias: {
      '@': options.paths.src,
    },
    extensions: ['.tsx', '.ts', '.js'],
  };
}
