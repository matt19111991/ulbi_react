import { AxiosInstance } from 'axios';

import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { rtkApi } from '@/shared/api/rtkApi';

import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { PageScrollSchema } from '@/entities/Page';
import { UserSchema } from '@/entities/User';

import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { CreateArticleFormSchema } from '@/features/ArticleCreateForm';
import { EditArticleFormSchema } from '@/features/ArticleEditForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';

import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';

export interface StateSchema {
  /**
   * Синхронные редюсеры
   */
  counter: CounterSchema;
  pageScroll: PageScrollSchema;
  user: UserSchema;

  /**
   * Редюсер для rtkApi
   */
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  /**
   * Асинхронные редюсеры
   */
  addCommentForm?: AddCommentFormSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsPage?: ArticleDetailsPageSchema;
  articlesPage?: ArticlesPageSchema;
  createArticleForm?: CreateArticleFormSchema;
  editArticleForm?: EditArticleFormSchema;
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

/**
 * ['counter', 'loginForm, 'user']
 */
export type StateSchemaKey = keyof StateSchema;

// используем 'OptionalRecord', т.к. не все редюсеры обязательные
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  /**
   * Возвращает список редюсеров
   */
  getReducerMap: () => ReducersMapObject<StateSchema>;

  /**
   * Если какие-то редюсеры были удалены, очищаем 'state' от них
   */
  reduce: (s: StateSchema, a: AnyAction) => CombinedState<StateSchema>;

  /**
   * По ключу добавляем редюсер
   */
  add: (k: StateSchemaKey, r: Reducer) => void;

  /**
   * Удаляем редюсер по ключу
   */
  remove: (k: StateSchemaKey) => void;

  /**
    'getMountedReducers'() - чтобы не монтировать заново уже смонтированные редюсеры
    (true - вмонтирован, false - демонтирован)
  */
  getMountedReducers: () => MountedReducers;
}

// расширение дефолтного типа для 'store'
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  /**
   * Используется для асинхронной подгрузки редюсеров
   */
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  /**
   * Экземпляр axios
   */
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  /**
   * Дополнительные конфигурационные опции
   */
  extra: ThunkExtraArg;

  /**
   * Можно задавать свои собственные типы для ошибки
   */
  rejectValue: T;

  /**
   * Схема хранилища всего приложения
   */
  state: StateSchema;
}
