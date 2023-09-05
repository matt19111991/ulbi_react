/*                                                    process.argv[2]        process.argv[3]
                                                                   v         v
  Запуск скрипта: npx ts-node ./scripts/removeFeature.ts isArticleEnabled off
*/

// import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';
import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on/off

const toggleComponentName = 'ToggleFeatures';
const toggleFunctionName = 'toggleFeatures';

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

// проверка: это компонент c названием '<ToggleFeatures />'?
const isToggleComponent = (node: Node) => {
  let isToggleFeatures = false;

  // проходимся по всем детям
  node.forEachChild((child) => {
    // находим компонент '<ToggleFeatures />'
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleComponentName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

// проверка: это функция с названием 'toggleFeatures'?
const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;

  // проходимся по всем детям
  node.forEachChild((child) => {
    // находим функцию 'toggleFeatures'
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

// const getAttributeName = (attribute: JsxAttribute) => attribute.getNameNode().getText();

// const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
// const found  =
// return jsxAttributes.find((attribute) => attribute.getNameNode().getText() === name);
// };

// const replaceToggleComponent = (node: Node) => {
// // берем все JSX атрибуты <ToggleFeatures /> компонента
// const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);
//
// const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
// const onAttribute = getAttributeNodeByName(attributes, 'on');
// const offAttribute = getAttributeNodeByName(attributes, 'off');
//
// // isArticleRatingEnabled
// const featureName = featureNameAttribute
//   ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
//   ?.getText()
//   ?.slice(1, -1); // убираем кавычки
//
// console.log('featureName', featureName)
//
// if (featureName !== removedFeatureName) {
//   return;
// }
//
// const onValue = onAttribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression();
// console.log('onValue', onValue)
// const offValue = offAttribute
//   ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
//   ?.getExpression();
// console.log('offValue', offValue)

// if (featureState === 'on') {
//   // подставляем то, что возвращается из 'on: () => (...)'
//   node.replaceWithText(onFunction?.getBody().getText() ?? '');
// }
//
// if (featureState === 'off') {
//   // подставляем то, что возвращается из 'off: () => (...)'
//   node.replaceWithText(offFunction?.getBody().getText() ?? '');
// }
// };

const replaceToggleFunction = (node: Node) => {
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
};

files.forEach((sourceFile) => {
  // проходимся по всем потомкам
  sourceFile.forEachDescendant((node) => {
    // находим функцию 'toggleFeatures'
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node);
    }

    // находим компонент <ToggleFeatures />
    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      // replaceToggleComponent(node);
    }
  });
});

project.save();
