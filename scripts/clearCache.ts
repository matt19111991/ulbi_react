/*
  скрипт для очистки кэша после установки новых модулей, будет запускаться каждый раз после
  установки модулей, т.к. мы определили скрипт 'npm run postinstall' в 'package.json'
*/

import { rmSync } from 'fs'; // синхронное удаление файлов и каталогов
import { resolve } from 'path'; // объединяет все переданные сегменты пути вместе в абсолютный путь

const cacheDir = resolve(__dirname, '..', 'node_modules', 'cache');

rmSync(cacheDir, {
  force: true, // ошибки будут игнорироваться, если путь не существует
  recursive: true,
});
