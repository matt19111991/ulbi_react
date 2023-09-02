/*                                                    process.argv[2]        process.argv[3]
                                                                   v         v
  Запуск скрипта: npx ts-node ./scripts/removeFeature.ts isArticleEnabled off
*/

import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on/off

if (!removedFeatureName) {
  throw new Error('Укажите название feature flag');
}

if (!featureState) {
  throw new Error('Укажите состояние feature (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Некорректное значение состояния feature (on или off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

// проверка: это функция - 'toggleFeatures'?
const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;

  // проходимся по всем детям
  node.forEachChild((child) => {
    // находим функцию 'toggleFeatures'
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

files.forEach((sourceFile) => {
  // проходимся по всем потомкам
  sourceFile.forEachDescendant((node) => {
    // находим функцию 'toggleFeatures'
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      // берем первого потомка (опции 'toggleFeatures')
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

      if (!objectOptions) {
        return;
      }

      // 'isCounterEnabled'
      const featureNameProperty = objectOptions.getProperty('name');

      // on: () => (<><h2>Redesigned counter</h2><Counter /></>)
      const onFunctionProperty = objectOptions.getProperty('on');

      // off: () => <Counter />
      const offFunctionProperty = objectOptions.getProperty('off');

      // достаем сами значения

      // isCounterEnabled
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1); // убираем кавычки

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

      if (featureName !== removedFeatureName) {
        return;
      }

      if (featureState === 'on') {
        // подставляем то, что возвращается из 'on: () => (...)'
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        // подставляем то, что возвращается из 'off: () => (...)'
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
