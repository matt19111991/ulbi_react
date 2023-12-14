import type { Configuration } from 'webpack';

import { BuildOptions } from './types/types';

// eslint-disable-next-line
export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
  };
}
