## Страница с нововведениями в React v.18 и v.19 

### Components

`VersionsPage` - компонент страницы с нововведениями в `React` `v.18` и `v.19`

`Version18` - компонент c нововведениями `v.18`:
- автобатчинг для асинхронных операций
- хук `useDeferredValue`
- хук `useId`
- хук `useInsertionEffect`
- хук `useSyncExternalStore`
- хук `useTransition` и отдельная функция `startTransition`

Также используются компоненты с искусственной задержкой отрисовки `SlowList` и `SlowPost`

`Version19` - компонент c нововведениями `v.19`:
- атрибут форм `action`
- функция `use` для контекста и промисов
- хук `useActionState`
- хук `useFormStatus`
- хук `useOptimistic`
- функция `forwardRef` больше не нужна, `ref` достается из `props`
- предпочтение в использовании `<Context />` вместо `<Context.Provider />`
- из атрибута `ref` можно вернуть функцию очистки при удалении элемента из `DOM`
- начальное состояние у `useDeferredValue(deferredValue, '')` для первого рендера
- метаданные можно указывать в `React` компонентах
- выставление приоритета для вставки `CSS`:
  - `<link href="foo" precedence="default" rel="stylesheet" />`
  - `<link href="bar" precedence="high" rel="stylesheet" />`
- предварительная загрузка ресурсов `preconnect`, `prefetchDNS`, `preload`, `preinit`

Также используется фейковый запрос `fakeLogin`
