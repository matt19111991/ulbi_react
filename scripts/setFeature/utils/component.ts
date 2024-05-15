import { JsxAttribute, Node, SyntaxKind } from 'ts-morph'; // либа для работы с 'AST'-деревом

const toggleComponentName = 'ToggleFeatures';

// проверка: это компонент c названием '<ToggleFeatures />'?
export const isToggleComponent = (node: Node) => {
  let isToggleFeatures = false;

  // проходимся по всем детям ноды
  node.forEachChild((child) => {
    // находим компонент '<ToggleFeatures />'
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleComponentName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
  return jsxAttributes.find((attribute) => attribute.getNameNode().getText() === name);
};

const getComponentToReplace = (attribute?: JsxAttribute) => {
  const text = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression() // убираем фигурные скобки
    ?.getText();

  // убираем обертку компонента в '()', если такая есть
  if (text?.startsWith('(')) {
    return text.slice(1, -1);
  }

  return text;
};

export const replaceToggleComponent = (
  node: Node,
  featureName: string,
  featureState: 'on' | 'off',
) => {
  // берем все 'JSX'-атрибуты '<ToggleFeatures />' компонента
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  // 'isAppRedesigned'
  const firstAttr = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1); // убираем кавычки

  if (firstAttr !== featureName) {
    return;
  }

  // 'JsxSelfClosingElement' => '<ArticleRating articleId={articleId} />'
  const onComponent = getComponentToReplace(onAttribute);

  // 'JsxSelfClosingElement' => '<Text title={t('Оценка статей скоро появится')} />'
  const offComponent = getComponentToReplace(offAttribute);

  if (featureState === 'on') {
    // подставляем компонент из 'on' атрибута вместо '<ToggleFeatures />' компонента
    node.replaceWithText(onComponent ?? '');
  }

  if (featureState === 'off') {
    // подставляем компонент из 'off' атрибута вместо '<ToggleFeatures />' компонента
    node.replaceWithText(offComponent ?? '');
  }
};
