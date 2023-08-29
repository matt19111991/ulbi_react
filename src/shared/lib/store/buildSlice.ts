import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  bindActionCreators,
  createSlice,
  CreateSliceOptions,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

// 'buildSlice' - аналог 'createSlice' из '@reduxjs/toolkit' с аналогичными типами

export const buildSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  const slice = createSlice(options);

  // 'typeof slice.actions' для корректной типизации
  const useActions = (): typeof slice.actions => {
    const dispatch = useDispatch();

    /*
      биндим 'dispatch' к каждому экшену, чтобы 'dispatch'
      не приходилось вызывать каждый раз в компонентах
   */

    // @ts-ignore
    return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
  };

  return { ...slice, useActions };
};
