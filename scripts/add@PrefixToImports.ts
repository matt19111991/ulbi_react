/*
  скрипт для автоматического перехода от импортов 'entities/Article' к '@/entities/Article'

 'npm run add:import:prefix' - запуск скрипта
*/

import { Project } from 'ts-morph'; // либа для работы с 'AST'-деревом

// для работы с 'AST'-деревом как с обычными объектами
const project = new Project(); // инициализация

// добавляем в проект все файлы, которые лежат по путям
project.addSourceFilesAtPaths('src/**/*.ts'); // добавляем все '.ts' файлы
project.addSourceFilesAtPaths('src/**/*.tsx'); // добавляем все '.tsx' файлы

// получаем список файлов
const files = project.getSourceFiles();

const isAbsolutePath = (importPath: string) => {
  const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

  // 'true' для 'entities/Article', 'pages/ArticlesPage', ...
  return layers.some((layer) => importPath.startsWith(layer));
};

files.forEach((sourceFile) => {
  // получаем все импорты
  const importDeclarations = sourceFile.getImportDeclarations();

  // проходимся по всем импортам
  importDeclarations.forEach((importDeclaration) => {
    // 'importPath' => 'entities/Article' | '../../selectors/articlesPageSelectors'
    const importPath = importDeclaration.getModuleSpecifierValue(); // строковое значение в 'import ... from [importPath]'

    if (isAbsolutePath(importPath)) {
      importDeclaration.setModuleSpecifier(`@/${importPath}`);
    }
  });
});

// можно просто вызвать 'project.save()', но линтер будет ругаться на необработанный промис
(async () => {
  await project.save(); // сохранение изменений в файловой системе
})();
