import type { PluginItem } from '@babel/core';

// для корректной работы с 'TS' нужно установить '@types/babel__core'

/*
  использование плагина:
  {
    test: ...,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            babelRemovePropsPlugin,
            {
              props: ['data-testid', '...'],
            },
          ],
        ],
      },
    },
  },
*/

export default (): PluginItem => {
  // чтобы изменять 'AST-дерево', нужно посетить узлы 'AST-дерева'
  return {
    visitor: { // 'babel' использует шаблон 'посетитель'
      // 'Program' - корень 'AST-дерева' (скрипт / модуль)
      Program(path, state) {
        const attributesToRemove = state.opts.props || []; // массив атрибутов для удаления

        path.traverse({ // проходимся по всем нодам 'AST-дерева'
          // вносим изменения только для 'JSXIdentifier' и его родителя 'JSXAttribute'
          JSXIdentifier(current) { // 'JSXIdentifier' === атрибут (например, 'data-testid')
            const nodeName = current.node.name; // получаем имя текущей ноды-атрибута

            if (attributesToRemove.includes(nodeName)) {
              current.parentPath.remove(); // удаляем целиком 'JSXIdentifier' и 'JSXAttribute'
            }
          },
        });
      },
    },
  };
};
