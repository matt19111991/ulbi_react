import type { PluginItem } from '@babel/core';

// для корректной работы с TS нужно установить '@types/babel__core'

export default (): PluginItem => { // использование: babelRemovePropsPlugin(['data-testid', '...']);
  return {
    visitor: {
/*   'Program' - название ноды в AST дереве; используем для того, чтобы можно было
      в плагин прокидывать атрибуты, которые хотим убрать из сборки
*/    Program(path, state) {
        const attributesToRemove = state.opts.props || []; // массив атрибутов для удаления

        path.traverse({ // проходимся по всем нодам AST дерева
//        JSXIdentifier === атрибут (как, например, 'data-testid')
          JSXIdentifier(current) {
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
