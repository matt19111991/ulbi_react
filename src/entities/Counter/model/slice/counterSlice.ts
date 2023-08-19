import { buildSlice } from '@/shared/lib/store';

import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
  value: 0,
};

/*
  вместо 'createSlice' из '@reduxjs/toolkit' используем свою функцию 'buildSlice',
  чтобы избавиться от необходимости использовать 'useDispatch' в каждом компоненте
*/
export const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: ((state) => {
/*    в '@reduxjs/toolkit' можно делать изменения напрямую (мутировать данные), т.к. под капотом
      используется Immer.js библиотека, которая все мутации переводит в иммутабельный стиль

*/    state.value -= 1;
    }),
    increment: ((state) => {
      state.value += 1;
    }),
  },
});

export const {
  actions: counterActions,
  reducer: counterReducer,
  useActions: useCounterActions,
} = counterSlice;
