export type BuildMode = 'development' | 'production';

export interface BuildPaths {
    build: string;
    entry: string;
    html: string;
}

export interface BuildOptions {
    isDev: boolean;
    mode: BuildMode;
    paths: BuildPaths;
}
