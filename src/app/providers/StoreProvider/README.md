## Провайдер для хранилища

- Configuration

`combineSlicesMiddleware` - костыль для RTK v2, чтобы избавиться от ошибки : "Unexpected key 
[reducerKey] found in previous state received by the reducer. Expected to find one of the known 
reducer keys instead: 'counter', 'pageScroll', 'user', 'api'. Unexpected keys will be ignored."

`reducerManager` - используется для асинхронной подгрузки редюсеров

`StateSchema` - основная схема хранилища

`store` - типизированный dispatch и функция для создания экземпляра хранилища

- Components

`StoreProvider` - компонент-провайдер для хранилища
