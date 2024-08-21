export type BuildMode = 'development' | 'production';

export interface BuildEnv {
  apiUrl: string;
  mode: BuildMode;
  port: number;
}

export interface BuildPaths {
  build: string;
  buildAssets: string; // куда складывать файлы изображений для манифеста
  buildLocales: string; // куда складывать файлы переводов для билда
  entry: string;
  favicon: string;
  googleVerification: string;
  html: string;
  locales: string; // где лежат файлы переводов
  manifest: string;
  manifestAssets: string;
  serviceWorker: string;
  src: string;
  robots: string;
  sitemapIndex: string;
  sitemap1: string;
  sitemap2: string;
}

export interface BuildOptions {
  apiUrl: string;
  isDev: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
  project: 'front-end' | 'jest' | 'storybook';  // запущенная среда
}
