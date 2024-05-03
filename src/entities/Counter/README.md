## Сущность счетчика

### Components

`Counter` - компонент счетчика

### Selectors

`getCounter` - селектор для получения состояния счетчика

`getCounterValue` - селектор для получения значения счетчика

### Slices

`counterActions` - объект с действиями для счетчика

`counterReducer` - редюсер счетчика

`counterSlice` - слайс для хранения информации о счетчике

`decrement` - действие для уменьшения значения счетчика

`increment` - действие для увеличения значения счетчика

`useCounterActions` - хук, возвращающий объект `counterActions`, но без необходимости использования `dispatch`

### Types

`CounterSchema` - тип, описывающий схему счетчика
