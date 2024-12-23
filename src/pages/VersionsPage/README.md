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
- хук `use` для контекста и промисов
- хук `useActionState`
- хук `useFormStatus`
- хук `useOptimistic`
- функция `forwardRef` больше не нужна, `ref` достается из `props`

Также используется фейковый запрос `fakeLogin`
