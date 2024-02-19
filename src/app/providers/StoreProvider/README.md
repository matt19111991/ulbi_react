## Провайдер для хранилища

### Configuration

`AppDispatch` - типизированный `dispatch`

`AsyncReducers` - тип для асинхронных редюсеров

`StateSchema` - основная схема хранилища

`StateSchemaKey` - ключи хранилища

`store` - функция для создания экземпляра хранилища

### Components

`StoreProvider` - компонент-провайдер для хранилища

### Create Async Thunks

`ThunkConfig` - тип для конфигурации асинхронных `thunks`

`ThunkExtraArg` - тип для дополнительных аргументов конфигурации `thunks`

### RTK v.1

`MountedReducers` - тип для объекта с уже смонтированными редюсерами

`reducerManager` - используется для асинхронной подгрузки редюсеров

`ReducerManager` - тип для `reducerManager`

`ReduxStoreWithManager` - расширение дефолтного типа для `store`

### RTK v.2

`combineSlicesMiddleware` - костыль для `RTK v.2`, чтобы избавиться от ошибки при удалении редюсера:
"Unexpected key [reducerKey] found in previous state received by the reducer. Expected to find one of
the known reducer keys instead: 'counter', 'pageScroll', 'user', 'api'. Unexpected keys will be ignored."
