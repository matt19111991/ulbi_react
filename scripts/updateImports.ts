// скрипт для автоматического перехода от импортов 'entities/Article' к '@/entities/Article'

import { Project } from 'ts-morph';

// для работы с AST деревом как с обычными объектами
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');  // добавляем все '.ts' файлы
project.addSourceFilesAtPaths('src/**/*.tsx'); // добавляем все '.tsx' файлы

const files = project.getSourceFiles(); // получаем все эти файлы

const isAbsolutePath = (importPath: string) => {
  const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

  // 'true' для 'entities/Article', 'pages/ArticlesPage', ...
  return layers.some((layer) => importPath.startsWith(layer));
};

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations(); // получаем все импорты

  importDeclarations.forEach((importDeclaration) => {
    // importPath => 'entities/Article' | '../../selectors/articlesPageSelectors'
    const importPath = importDeclaration.getModuleSpecifierValue();

    if (isAbsolutePath(importPath)) {
      importDeclaration.setModuleSpecifier(`@/${importPath}`);
    }
  });
});

project.save();
