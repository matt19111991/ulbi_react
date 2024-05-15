/*
  скрипт генерации отчетов 'loki' для визуализации данных

 'npm run test:ui:json' - генерация 'JSON' с различиями между скриншотами 'Loki'

 'npm run test:ui:html' - генерация 'HTML' страницы на базе 'JSON' файла с различиями между скриншотами 'Loki'

 'npm run test:ui:report' - генерация полного отчета ('JSON' и 'HTML') для скриншотных тестов 'Loki'
*/

import {
  readdir, // асинхронное чтение содержимого из каталога
  writeFile, // асинхронная запись данных в файл
} from 'fs';

import {
  /*
    объединяет все переданные сегменты пути вместе, используя разделитель, зависящий от
    платформы, а затем нормализует полученный путь
  */
  join,

  /*
    вычисляет относительный путь для 'to' значения => 'relative(from, to)',
      "path.relative('/data/local/test/aaa', '/data/local/impl/bbb');" => '../../impl/bbb'
  */
  relative,
} from 'path';

// принимает колбэк вида '(err, [...optional], resolveFn) => {}' и трансформирует его в промис
import { promisify } from 'util';

const asyncReaddir = promisify(readdir);
const asyncWriteFile = promisify(writeFile);

const lokiDir = join(__dirname, '..', '.loki');
const actualDir = join(lokiDir, 'current');
const expectedDir = join(lokiDir, 'reference');
const diffDir = join(lokiDir, 'difference');

(async function main() {
  const diffs = await asyncReaddir(diffDir);

  await asyncWriteFile(
    join(lokiDir, 'report.json'),
    JSON.stringify({
      actualItems: diffs,
      deletedItems: [],
      diffItems: diffs,
      expectedItems: diffs,
      failedItems: diffs,
      newItems: [],
      passedItems: [],
      actualDir: relative(lokiDir, actualDir),
      expectedDir: relative(lokiDir, expectedDir),
      diffDir: relative(lokiDir, diffDir),
    }),
  );
})();
