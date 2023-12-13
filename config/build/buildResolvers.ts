import webpack from 'webpack';

import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
    return {
        // alias: {}, // для импортов вида 'shared/Article'

        alias: {
            '@': options.paths.src, // для импортов вида '@/shared/Article'
        },

/*      при импорте файлов с этими расширениями, можно указывать только название файла:
        (component.tsx => component): import Component from './component';
*/      extensions: ['.tsx', '.ts', '.js'], // порядок важен, приоритет: .tsx => .ts => .js

//      главный файл для каждого модуля
        mainFiles: ['index'],

/*      директория с модулями (по умолчанию только 'node_modules'):
        задаем, чтобы была возможность пользоваться абсолютными импортами;
        должна быть консистентность с tsconfig.json (paths)
*/      modules: [options.paths.src, 'node_modules'],

        preferAbsolute: true, // предпочтение отдается абсолютным путям
    };
}
