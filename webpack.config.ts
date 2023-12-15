import path from 'path';

import { buildWebpack } from './src/webpack/config/build/buildWebpack';
import type { BuildMode, BuildPaths } from './src/webpack/config/build/types/types';

interface EnvVariables {
  analyzer?: boolean;
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'webpack', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src', 'webpack'),
  };

  const config = buildWebpack({
    analyzer: env.analyzer ?? false,
    mode: env.mode ?? 'development',
    paths: paths,
    port: env.port ?? 3000,
  });

  return config;
};
