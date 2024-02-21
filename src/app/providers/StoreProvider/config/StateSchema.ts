import type { AxiosInstance } from 'axios';

import type {
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';

import { rtkApi } from '@/shared/api/rtkApi';

import type { ArticleDetailsSchema } from '@/entities/Article';
import type { CounterSchema } from '@/entities/Counter';
import type { UserSchema } from '@/entities/User';

import type { AddCommentFormSchema } from '@/features/AddCommentForm';
import type { CreateArticleFormSchema } from '@/features/ArticleCreateForm';
import type { EditArticleFormSchema } from '@/features/ArticleEditForm';
import type { LoginSchema } from '@/features/AuthByUsername';
import type { ProfileSchema } from '@/features/EditableProfileCard';

import type { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import type { ArticlesPageSchema } from '@/pages/ArticlesPage';

import type { PageScrollSchema } from '@/widgets/Page';

export interface AsyncReducers {
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

export interface StateSchema extends AsyncReducers {
  /**
   * Синхронные редюсеры
   */
  counter: CounterSchema;
  pageScroll: PageScrollSchema;
  user: UserSchema;

  /**
   * Редюсер для 'rtkApi'
   */
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>; // 'api': combinedReducer(...)
  /*
    'rtkApi.reducer' => (state, action) => combinedReducer(resetApiState.match(action) ? void 0 : state, action)
      'typeof rtkApi.reducer' => function
        'ReturnType<typeof rtkApi.reducer>' => combinedReducer(resetApiState.match(action) ? void 0 : state, action)
 */
}

/**
 * Ключи хранилища ['counter', 'loginForm', 'user', ...]
 */
export type StateSchemaKey = keyof StateSchema;

// используем 'OptionalRecord', т.к. не все редюсеры обязательные
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

// RTK v.1
export interface ReducerManager {
  /**
   * Возвращает список редюсеров
   */
  getReducerMap: () => ReducersMapObject<StateSchema>;

  /**
   'getMountedReducers()' - чтобы не монтировать заново уже смонтированные редюсеры
   true - вмонтирован, false - демонтирован
   */
  getMountedReducers: () => MountedReducers;

  /**
   * По ключу добавляем редюсер
   */
  add: (k: StateSchemaKey, r: Reducer) => void;

  /**
   * Удаляем редюсер по ключу
   */
  remove: (k: StateSchemaKey) => void;

  /**
   * Если какие-то редюсеры были удалены, очищаем 'state' от них
   */
  reduce: (s: StateSchema, a: UnknownAction) => StateSchema;
}

// расширение дефолтного типа для 'store'
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  /**
   * Используется для асинхронной подгрузки редюсеров в RTK v.1
   */
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  /**
   * Экземпляр 'axios'
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

/**
 * Кастомная типизация 'dispatch', чтобы типы экшенов, схем, хранилища подхватывались 'TypeScript-ом'
 */
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>;
