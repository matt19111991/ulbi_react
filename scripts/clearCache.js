const fs = require('fs');
const path = require('path');

// Скрипт для очистки кэша после установки новых модулей

fs.rmSync(path.resolve(__dirname, '..', 'node_modules', '.cache'), {
  force: true,
  recursive: true,
});
