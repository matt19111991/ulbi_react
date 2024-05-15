/*
  скрипт для автоматического перевода 'feature' только в одно определенное
  состояние ('on' или 'off') для всего проекта

 'process.argv[0]' === путь до 'ts-node'
 'process.argv[1]' === путь до запускаемого скрипта (текущий 'index.ts' файл)

                              'process.argv[2]'  'process.argv[3]'
                                            v          v
  запуск скрипта: 'npm run set:feature isAppRedesigned on'
*/

import { Project, SyntaxKind } from 'ts-morph'; // либа для работы с 'AST'-деревом

import { isToggleComponent, replaceToggleComponent } from './utils/component';
import { isToggleFunction, replaceToggleFunction } from './utils/function';

const featureName = process.argv[2]; // 'isAppRedesigned'
const featureState = process.argv[3]; // 'on' / 'off'

if (!featureName) {
  throw new Error('Укажите название для Feature Flag');
}

if (!featureState) {
  throw new Error("Укажите состояние для Feature Flag ('on' или 'off)'");
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error(
    "Некорректное значение состояния для Feature Flag (допустимы только 'on' или 'off')",
  );
}

const project = new Project(); // инициализация

// добавляем в проект все файлы, которые лежат по путям
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем список файлов
const files = project.getSourceFiles();

files.forEach((sourceFile) => {
  // проходимся по всем потомкам в каждом файле
  sourceFile.forEachDescendant((node) => {
    // находим компонент '<ToggleFeatures />'
    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      return replaceToggleComponent(node, featureName, featureState);
    }

    // находим функцию 'toggleFeatures'
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node, featureName, featureState);
    }

    return null; // возвращаем что угодно, чтобы линтер не ругался
  });
});

// можно просто вызвать 'project.save()', но линтер будет ругаться на необработанный промис
(async () => {
  await project.save(); // сохранение изменений в файловой системе
})();
