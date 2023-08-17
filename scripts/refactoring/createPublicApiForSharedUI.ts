// скрипт для автоматического создания 'Public API' для 'shared' слоя

import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const sharedUiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(sharedUiPath);

// папки 'Card' | 'Drawer' | 'Modal'
const componentsDirs = sharedUiDirectory?.getDirectories();

// создаем index.ts файлы, где это необходимо
componentsDirs?.forEach((directory) => {
  // 'shared/ui/Card/index.ts'
  const indexFilePath = `${directory.getPath()}/index.ts`;

  const indexFile = directory.getSourceFile(indexFilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}';
`;

    const file = directory.createSourceFile(
      indexFilePath,
      sourceCode,
      { overwrite: true },
    );

    file.save();
  }
});

const isAbsolutePath = (importPath: string) => {
  const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

  // 'true' для 'entities/Article', 'pages/ArticlesPage', ...
  return layers.some((layer) => importPath.startsWith(layer));
};

const files = project.getSourceFiles();

// исправляем вложенные импорты ('shared/ui/Card/Card') на импорты из Public API ('shared/ui/Card')
files?.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations(); // получаем все импорты

  importDeclarations.forEach((importDeclaration) => {
    // importPath => '@/entities/Article' | '../../selectors/articlesPageSelectors'
    const value = importDeclaration.getModuleSpecifierValue();

    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');

    // 'features' | 'entities' | 'shared'
    const isSharedLayer = segments?.[0] === 'shared';

    // 'api' | 'model' | 'ui'
    const isUiSlice = segments?.[1] === 'ui';

    if (isAbsolutePath(valueWithoutAlias) && isSharedLayer && isUiSlice) {
/*    отрезаем от 'shared/ui/Card/Card' часть после последнего слэша =>
      остается 'shared/ui/Card'
*/    const resultPath = valueWithoutAlias.split('/').slice(0, 3).join('/');

      importDeclaration.setModuleSpecifier(`@/${resultPath}`);
    }
  });
});

project.save();
