/*
  скрипт для автоматического создания 'Public API' для 'UI' в 'shared' слое

 'npm run create:shared:ui:public:api' - запуск скрипта
*/

import { resolve } from 'path'; // объединяет все переданные сегменты пути вместе в абсолютный путь
import { Project } from 'ts-morph'; // либа для работы с 'AST'-деревом

// для работы с 'AST'-деревом как с обычными объектами
const project = new Project(); // инициализация

// добавляем в проект все файлы, которые лежат по путям
project.addSourceFilesAtPaths('src/**/*.ts'); // добавляем все '.ts' файлы
project.addSourceFilesAtPaths('src/**/*.tsx'); // добавляем все '.tsx' файлы

// '/home/dmitry/WebstormProjects/ulbi_react/src/shared/ui'
const sharedUiPath = resolve(__dirname, '..', 'src', 'shared', 'ui');

// получаем папку 'ui'
const sharedUiDirectory = project.getDirectory(sharedUiPath);

// получаем дочерние папки: 'deprecated' и 'redesigned'
const parentDirs = sharedUiDirectory?.getDirectories();

// проходимся по папкам 'deprecated' и 'redesigned' и создаем 'index.ts' файлы, где это необходимо
parentDirs?.forEach((parentDirectory) => {
  // получаем дочерние папки: 'Card' | 'Drawer' | 'Modal' | ...
  const componentsDirs = parentDirectory?.getDirectories();

  // проходимся по всем папкам с компонентами
  componentsDirs?.forEach(async (directory) => {
    // '/home/dmitry/WebstormProjects/ulbi_react/src/shared/ui/redesigned/Card/index.ts'
    const indexFilePath = `${directory.getPath()}/index.ts`;

    // получаем файл 'index.ts' из директории
    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
      // 'directory.getBaseName()' => 'Card' | 'Drawer' | 'Modal' | ...
      const indexFileContent = `export * from './${directory.getBaseName()}';\n`;

      // создаем 'index.ts' файл с контентом
      const file = directory.createSourceFile(indexFilePath, indexFileContent, { overwrite: true });

      await file.save(); // асинхронное сохранение изменений в файле
    }
  });
});

const isAbsolutePath = (importPath: string) => {
  const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

  // 'true' для 'entities/Article', 'pages/ArticlesPage', ...
  return layers.some((layer) => importPath.startsWith(layer));
};

// получаем список файлов
const files = project.getSourceFiles();

// исправляем вложенные импорты ('@/shared/ui/Card/Card') на импорты из 'Public API' ('@/shared/ui/Card')
files?.forEach((sourceFile) => {
  // получаем все импорты
  const importDeclarations = sourceFile.getImportDeclarations();

  // проходимся по всем импортам
  importDeclarations.forEach((importDeclaration) => {
    // 'importPath' => '@/entities/Article' | '../../selectors/articlesPageSelectors'
    const importPath = importDeclaration.getModuleSpecifierValue(); // строковое значение в 'import ... from [importPath]'

    // 'importPathWithoutAlias' => 'entities/Article' | '../../selectors/articlesPageSelectors'
    const importPathWithoutAlias = importPath.replace('@/', '');

    // '['entities', 'Notification']' | '['shared', 'ui', 'redesigned', 'Button']' | ...
    const segments = importPathWithoutAlias.split('/');

    const isSharedLayer = segments?.[0] === 'shared'; // 'features' | 'entities' | 'shared'
    const isUiSlice = segments?.[1] === 'ui'; // 'api' | 'model' | 'ui'

    const lastSegment = segments.length && segments[segments.length - 1]; // последний сегмент
    const lastButOneSegment = segments.length > 1 && segments[segments.length - 2]; // предпоследний сегмент

    // последний и предпоследний сегменты равны ('Card/Card')
    const hasDuplicatedFolders = lastSegment === lastButOneSegment;

    if (
      isAbsolutePath(importPathWithoutAlias) &&
      isSharedLayer &&
      isUiSlice &&
      hasDuplicatedFolders
    ) {
      // отрезаем от 'shared/ui/Card/Card' часть после последнего слэша => остается 'shared/ui/Card'
      const resultPath = importPathWithoutAlias.split('/').slice(0, -1).join('/');

      importDeclaration.setModuleSpecifier(`@/${resultPath}`);
    }
  });
});

// можно просто вызвать 'project.save()', но линтер будет ругаться на необработанный промис
(async () => {
  await project.save(); // сохранение изменений в файловой системе
})();
