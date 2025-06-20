## Запуск скриптов

Запуск скриптов с расширением `.ts` должен производиться при помощи `ts-node`, иначе ошибка
`SyntaxError: Cannot use import statement outside a module`, если запускать через обычную `Node`:
`node scripts/clearCache.ts`

## Скрипты

`add@PrefixToImports` - скрипт для автоматического перехода от импортов `entities/Article` к `@/entities/Article`

`clearCache` - скрипт для очистки кэша после установки новых модулей

`createPublicApiForSharedUI` - скрипт для автоматического создания `Public API` для `UI` в `shared` слое

`generateFsdSliceTemplate` - скрипт для генерации `FSD` слайсов

`generateLokiJsonReport` - скрипт генерации отчетов `loki` для визуализации данных

`makeJestWindowConfigurable` - скрипт для корректной работы `window.location` и `Jest v.30+`

`setFeature` - автоматический перевод `feature` только в одно определенное 
состояние (`on` или `off`) для всего проекта
