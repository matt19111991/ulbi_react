import { useMemo } from 'react';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

import type {
  CaseReducerActions,
  CreateSliceOptions,
  SliceCaseReducers,
  SliceSelectors,
  Slice,
} from '@reduxjs/toolkit';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';

// все 'Generics' и типы взяты из исходников 'createSlice'

interface UseActions<State, CaseReducers extends SliceCaseReducers<State>, Name extends string> {
  useActions: () => CaseReducerActions<CaseReducers, Name>;
}

type Return<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  ReducerPath extends string,
  Selectors extends SliceSelectors<State>,
> = Slice<State, CaseReducers, Name, ReducerPath, Selectors> &
  UseActions<State, CaseReducers, Name>;

/**
 * Аналог 'createSlice' из '@reduxjs/toolkit', но без необходимости вызывать 'dispatch'
 * каждый раз в компонентах
 * @param options
 */
export const buildSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name,
>(
  options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>,
): Return<State, CaseReducers, Name, ReducerPath, Selectors> => {
  const slice = createSlice(options);

  const useActions = () => {
    const dispatch = useAppDispatch();

    // биндим 'dispatch' к каждому экшену, чтобы 'dispatch' не приходилось вызывать каждый раз в компонентах
    return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
  };

  return { ...slice, useActions };
};
