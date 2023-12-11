import fs from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

/*
  для файла конфигурации 'vite.config.mts' устанавливаем расширение '.mts', чтобы
  запускать vite в режиме ESM (ES modules) и избегать предупреждения
  "The CJS build of Vite's Node API is deprecated"
*/

/*
  для 'vite' нужен отдельный 'index.html' файл в корне проекта:
  в '<body />' после '<div id="root" />' нужно добавить '<script />' к '/src/index.tsx' корневому файлу
*/

/*
  костыль для совместной работы 'vite' и 'react-virtualized'
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
    __API__: JSON.stringify('http://localhost:8000'),
    __IS_DEV__: JSON.stringify(true),
    __PROJECT__: JSON.stringify('front-end'),
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
    port: 3000,
  },
});
