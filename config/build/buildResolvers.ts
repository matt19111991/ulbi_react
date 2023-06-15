import webpack from 'webpack';

export function buildResolvers(): webpack.ResolveOptions {
    return {
/*      при импорте файлов с этими расширениями, можно указывать только название файла (component.tsx => component):
        import Component from './component';
*/      extensions: ['.tsx', '.ts', '.js'],
    }
}
