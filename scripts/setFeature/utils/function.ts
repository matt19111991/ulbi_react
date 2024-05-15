import { Node, SyntaxKind } from 'ts-morph'; // либа для работы с 'AST'-деревом

const toggleFunctionName = 'toggleFeatures';

// проверка: это функция с названием 'toggleFeatures'?
export const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;

  // проходимся по всем детям ноды
  node.forEachChild((child) => {
    // находим функцию 'toggleFeatures'
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

export const replaceToggleFunction = (
  node: Node,
  featureName: string,
  featureState: 'on' | 'off',
) => {
  // берем первого потомка (опции 'toggleFeatures')
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

  if (!objectOptions) {
    return;
  }

  // 'isAppRedesigned'
  const featureNameProperty = objectOptions.getProperty('name');

  // 'on: () => (<><h2>Redesigned counter</h2><Counter /></>)'
  const onFunctionProperty = objectOptions.getProperty('on');

  // 'off: () => <Counter />'
  const offFunctionProperty = objectOptions.getProperty('off');

  // достаем сами значения

  // 'isAppRedesigned'
  const firstAttr = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1); // убираем кавычки

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

  if (firstAttr !== featureName) {
    return;
  }

  if (featureState === 'on') {
    // подставляем то, что возвращается из 'on: () => (...)' вместо 'toggleFeatures()' функции
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    // подставляем то, что возвращается из 'off: () => (...)' вместо 'toggleFeatures()' функции
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};
