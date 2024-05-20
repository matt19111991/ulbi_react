### Сборка

`cross-env NODE_OPTIONS=--no-warnings='DEP0060'` добавляется в команду перед запуском сборки,
чтобы избежать предупреждения в `Node v22.x`: '(node:52412) [DEP0060] DeprecationWarning: The `util._extend` 
API is deprecated. Please use Object.assign() instead.'

## devDependencies

Зависимости, относящиеся к `Webpack` заносятся в `devDependencies`,
т.к. после создания билда они не нужны в `production` сборке
