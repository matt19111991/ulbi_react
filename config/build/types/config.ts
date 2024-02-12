export type BuildMode = 'development' | 'production';

export interface BuildEnv {
  apiUrl: string;
  mode: BuildMode;
  port: number;
}

export interface BuildPaths {
  build: string;
  buildLocales: string; // куда складывать файлы переводов для билда
  entry: string;
  favicon: string;
  html: string;
  locales: string; // где лежат файлы переводов
  src: string;
  robots: string;
}

export interface BuildOptions {
  apiUrl: string;
  isDev: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
  project: 'front-end' | 'jest' | 'storybook';  // запущенная среда
}
