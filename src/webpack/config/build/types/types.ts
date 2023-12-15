export type BuildMode = 'development' | 'production';

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
}

export interface BuildOptions {
  analyzer?: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
}
