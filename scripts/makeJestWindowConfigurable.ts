/*
  Временное решение для 'Jest v.30+'

  Известные проблемы при переходе на 'Jest v.30+': 'https://jestjs.io/blog/2025/06/04/jest-30#known-issues'

  Патч для 'jsdom': 'https://gist.github.com/cpojer/e66f9a082021a82230f2595a6027f161'

  скрипт для возможности мокать поля для 'window.location' при использовании 'Jest v.30+'
*/

import { readFileSync, writeFileSync } from 'fs'; // синхронное чтение и запись файлов
import { resolve } from 'path'; // объединяет все переданные сегменты пути вместе в абсолютный путь

const fileToPatch = resolve(
  __dirname,
  '..',
  'node_modules',
  'jsdom',
  'lib',
  'jsdom',
  'browser',
  'Window.js',
);

const fileContent = readFileSync(fileToPatch, 'utf8');

const patchedContent = fileContent.replace(
  /location: { configurable: false }/,
  'location: { configurable: true }',
);

writeFileSync(fileToPatch, patchedContent, 'utf8');
