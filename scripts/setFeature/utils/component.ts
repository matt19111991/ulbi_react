import { JsxAttribute, Node, SyntaxKind } from 'ts-morph';

const toggleComponentName = 'ToggleFeatures';

// проверка: это компонент c названием '<ToggleFeatures />'?
export const isToggleComponent = (node: Node) => {
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

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
  return jsxAttributes.find((attribute) => attribute.getNameNode().getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const text = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  // убираем обертку компонента в '()'
  if (text?.startsWith('(')) {
    return text.slice(1, -1);
  }

  return text;
};

export const replaceToggleComponent = (
  node: Node,
  removedFeatureName: string,
  featureState: string,
) => {
  // берем все 'JSX'-атрибуты '<ToggleFeatures />' компонента
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  // 'isArticleRatingEnabled'
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1); // убираем кавычки

  if (featureName !== removedFeatureName) {
    return;
  }

  // 'JsxSelfClosingElement' => '<ArticleRating articleId={articleId} />'
  const onValue = getReplacedComponent(onAttribute);

  // 'JsxSelfClosingElement' => '<Card>{t('Оценка статей скоро появится')}</Card>'
  const offValue = getReplacedComponent(offAttribute);

  if (featureState === 'on') {
    // подставляем компонент из 'on' атрибута
    node.replaceWithText(onValue ?? '');
  }

  if (featureState === 'off') {
    // подставляем компонент из 'off' атрибута
    node.replaceWithText(offValue ?? '');
  }
};
