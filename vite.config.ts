import fs from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

/*
  Флаг 'VITE_CJS_IGNORE_WARNING=true' при запуске 'vite' нужен, чтобы избегать предупреждения
  "The CJS build of Vite's Node API is deprecated"

  Вместо использования этого флага, можно переименовать 'vite.config.ts' в 'vite.config.mts'
*/

/*
  Для 'vite' нужен отдельный 'index.html' файл в корне проекта:
  Документация: https://vite-docs-ru.vercel.app/guide/#index-html-%D0%B8-%D0%BA%D0%BE%D1%80%D0%B5%D0%BD%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0
*/

/*
  В '<body />' после '<div id="root" />' нужно добавить
  '<script type="module" src="/src/index.tsx"></script>' с 'src', ведущим к корневому файлу
*/

/*
  Костыль для совместной работы 'vite' и 'react-virtualized'
  'react-virtualized' лучше заменить на 'react-window' или 'react-virtuoso'
*/
const reactVirtualizedHack = (): PluginOption => {
  return {
    name: 'flat:react-virtualized',
    configResolved: async () => {
      const WRONG_CODE = 'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";';

      const require = createRequire(import.meta.url);

      const reactVirtualizedPath = require.resolve('react-virtualized');

      const { pathname: reactVirtualizedFilePath } = new url.URL(
        reactVirtualizedPath,
        import.meta.url,
      );

      const file = reactVirtualizedFilePath.replace(
        path.join('dist', 'commonjs', 'index.js'),
        path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
      );

      const code = await fs.readFile(file, 'utf-8');

      const modified = code.replace(WRONG_CODE, '');

      await fs.writeFile(file, modified);
    },
  };
};

export default defineConfig({
  define: {
    __API__: JSON.stringify('http://localhost:8000/'),
    __IS_DEV__: JSON.stringify(true),
    __PROJECT__: JSON.stringify('front-end'),
    __VAPID_KEY__: JSON.stringify(
      'BEkq_mrT97fQO_G2oSsB1lAokrDMxgec94rOP3L7ZcTKXpLC-62M9hWj_2hNWm2CrNYQjJN0Q5c0BJxTx4XCQtY',
    ),
  },
  plugins: [
    react(),
    reactVirtualizedHack(),
    svgr({
      // Иначе ошибка: 'getDerivedStateFromProps error: DOMException:
      // Failed to execute 'createElement' on 'Document': The tag name
      // provided ('/src/shared/assets/icons/theme-old.svg') is not a valid name.
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    host: true, // для корректной работы 'E2E'-тестов в 'Windows'
    port: 3000,
  },
});
