## Провайдер для хранилища

### Configuration

`AppDispatch` - типизированный `dispatch`

`AsyncReducers` - тип для асинхронных редюсеров

`createReduxStore` - функция для создания экземпляра хранилища

`StateSchema` - тип основной схемы хранилища

`StateSchemaKey` - тип для ключей хранилища

### Components

`StoreProvider` - компонент-провайдер для хранилища

### Create Async Thunks

`ThunkConfig` - тип для конфигурации асинхронных `thunks`

`ThunkExtraArg` - тип для дополнительных аргументов конфигурации `thunks`

### RTK v.1

`createReducerManager` - функция для асинхронной подгрузки редюсеров

`MountedReducers` - тип для объекта с уже смонтированными редюсерами

`ReducerManager` - тип для `reducerManager`

`ReduxStoreWithManager` - расширение дефолтного типа для `store`

### RTK v.2

`combineSlicesAvoidErrorMessageMiddleware` - костыль для `RTK v.2`, чтобы избавиться от ошибки при удалении 
редюсера: "Unexpected key [reducerKey] found in previous state received by the reducer. Expected to find one
of the known reducer keys instead: 'counter', 'pageScroll', 'user', 'api'. Unexpected keys will be ignored."

`rootReducer` - корневой редюсер с возможностью подключения асинхронных редюсеров
