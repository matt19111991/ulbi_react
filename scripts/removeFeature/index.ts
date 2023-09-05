/*                                  process.argv[2]        process.argv[3]
                                                 v         v
  Запуск скрипта: npm run remove:feature isArticleEnabled off
*/

import { Project, SyntaxKind } from 'ts-morph';

import { isToggleComponent, replaceToggleComponent } from './removeComponent';
import { isToggleFunction, replaceToggleFunction } from './removeFunction';

const removedFeatureName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on/off

if (!removedFeatureName) {
  throw new Error('Укажите название feature flag');
}

if (!featureState) {
  throw new Error("Укажите состояние feature ('on' или 'off)'");
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error("Некорректное значение состояния feature ('on' или 'off')");
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

files.forEach((sourceFile) => {
  // проходимся по всем потомкам
  sourceFile.forEachDescendant((node) => {
    // находим компонент <ToggleFeatures />
    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      replaceToggleComponent(node, removedFeatureName, featureState);
    }

    // находим функцию 'toggleFeatures'
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node, removedFeatureName, featureState);
    }
  });
});

project.save();
