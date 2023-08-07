import { PluginItem } from '@babel/core';

export default (): PluginItem => {
  return {
    visitor: {
/*   'Program' - название ноды в AST дереве; используем для того, чтобы можно было
      в плагин прокидывать атрибуты, которые хотим убрать из сборки
*/    Program(path, state) {
        const attributesToRemove = state.opts.props || []; // массив атрибутов для удаления

        path.traverse({ // проходимся по всем нодам AST дерева
          JSXIdentifier(current) { // JSXIdentifier === атрибут (как, например, 'data-testid')
            const nodeName = current.node.name; // получаем имя текущей ноды

            if (attributesToRemove.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
};

// babelRemovePropsPlugin(['data-testid', '...']);
