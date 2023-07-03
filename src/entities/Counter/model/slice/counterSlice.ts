import { createSlice } from '@reduxjs/toolkit';

import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = createSlice({
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

export const { actions: counterActions } = counterSlice;

export const { reducer: counterReducer } = counterSlice;
