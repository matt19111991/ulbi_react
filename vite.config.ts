import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

/*
  Для 'vite' нужен отдельный 'index.html' файл в корне проекта:
  Документация: https://vite-docs-ru.vercel.app/guide/#index-html-%D0%B8-%D0%BA%D0%BE%D1%80%D0%B5%D0%BD%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0
*/

/*
  В '<body />' после '<div id="root" />' нужно добавить
  '<script type="module" src="/src/index.tsx"></script>' с 'src', ведущим к корневому файлу
*/

// В случае проблем с работой библиотеки 'react-virtualized' можно использовать плагин 'esbuild-plugin-react-virtualized'

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
