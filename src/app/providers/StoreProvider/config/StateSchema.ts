import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';

import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';

import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  // Синхронные редюсеры
  counter: CounterSchema;
  user: UserSchema;

  // Асинхронные редюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema; // ['counter', 'loginForm, 'user']

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (s: StateSchema, a: AnyAction) => CombinedState<StateSchema>,
  add: (k: StateSchemaKey, r: Reducer) => void,
  remove: (k: StateSchemaKey) => void,
}

// расширение дефолтного типа для 'store'
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  rejectValue: T;
  state: StateSchema;
}
