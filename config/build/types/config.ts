export type BuildMode = 'development' | 'production';

export interface BuildEnv {
  apiUrl: string;
  mode: BuildMode;
  port: number;
}

export interface BuildPaths {
  build: string;
  entry: string;
  html: string;
  src: string;
}

export interface BuildOptions {
  apiUrl: string;
  isDev: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
  project: 'front-end' | 'jest' | 'storybook';  // запущенная среда
}
