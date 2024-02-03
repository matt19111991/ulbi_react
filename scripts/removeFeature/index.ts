/*                                  process.argv[2]        process.argv[3]
                                                 v         v
  Запуск скрипта: npm run set:feature isAppRedesigned on
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
  // eslint-disable-next-line consistent-return
  sourceFile.forEachDescendant((node) => {
    // находим компонент <ToggleFeatures />
    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      return replaceToggleComponent(node, removedFeatureName, featureState);
    }

    // находим функцию 'toggleFeatures'
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node, removedFeatureName, featureState);
    }
  });
});

project.save();
