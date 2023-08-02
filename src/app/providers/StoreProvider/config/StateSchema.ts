import { AxiosInstance } from 'axios';

import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { rtkApi } from 'shared/api/rtkApi';

import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';

import { AddCommentFormSchema } from 'features/AddCommentForm';
import { LoginSchema } from 'features/AuthByUsername';
import { ProfileSchema } from 'features/EditableProfileCard';

import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

import { PageScrollSchema } from 'widgets/Page';

export interface StateSchema {
  // Синхронные редюсеры
  counter: CounterSchema;
  pageScroll: PageScrollSchema;
  user: UserSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // Асинхронные редюсеры
  addCommentForm?: AddCommentFormSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
  articlesPage?: ArticlesPageSchema;
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema; // ['counter', 'loginForm, 'user']

// используем 'OptionalRecord', т.к. не все редюсеры обязательные
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (s: StateSchema, a: AnyAction) => CombinedState<StateSchema>,
  add: (k: StateSchemaKey, r: Reducer) => void,
  remove: (k: StateSchemaKey) => void,
/*
  'getMountedReducers'() - чтобы не монтировать заново уже смонтированные редюсеры
  (true - вмонтирован, false - демонтирован)
*/getMountedReducers: () => MountedReducers;
}

// расширение дефолтного типа для 'store'
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  rejectValue: T;
  state: StateSchema;
}
