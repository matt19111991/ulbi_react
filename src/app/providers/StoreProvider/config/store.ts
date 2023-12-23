import {
  configureStore,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { pageScrollReducer } from '@/widgets/Page';

import { createReducerManager } from './reducerManager';
import { ReduxStoreWithManager, StateSchema, ThunkExtraArg } from './StateSchema';

// оборачиваем в дополнительную функцию для переиспользования 'store' в 'jest', 'storybook' и других местах
export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    pageScroll: pageScrollReducer,
    user: userReducer,

    [rtkApi.reducerPath]: rtkApi.reducer,

    ...asyncReducers,
  };

  // TODO: перейти с reducerManager на combineSlices

  /**
   * Для возможности использования асинхронных редюсеров
   */
  const reducerManager = createReducerManager(rootReducers);

  const extraArgument: ThunkExtraArg = {
    api: $api, // добавляем в 'RTK' возможность использовать кастомный инстанс 'axios'
  };

  const store = configureStore({
    /**
     * Включаем инструменты разработчика только в режиме разработки
     */
    devTools: __IS_DEV__,

    /*
      'reducerManager.reduce as ReducersMapObject<StateSchema>' в поле 'reducer' помогает избежать
      ошибки типов в поле 'middleware', которая возникает из-за использования 'reducerManager'
    */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        /**
         * Иначе ошибки в тестах вида:
         *  'A non-serializable value was detected in the state, in the path:
         * `api.queries.getArticleRecommendationsList(4).data.0.user.avatar`.
         * Value: [Function: JestEmptyComponent]'
         */
        serializableCheck: false,

        /**
         * Дополнительные конфигурационные опции
         */
        thunk: {
          extraArgument,
        },
      }).concat(rtkApi.middleware),

    /**
     * Инициализация 'store' заранее подготовленными данными для тестов, storybook и т.д.
     */
    preloadedState: initialState,

    // reducer: rootReducers, // по умолчанию, когда все редюсеры синхронные

    /**
     * Для работы с асинхронными редюсерами
     */
    reducer: reducerManager.reduce as Reducer<StateSchema>,
  }) as ReduxStoreWithManager;

  // для возможности использования асинхронных редюсеров
  store.reducerManager = reducerManager;

  return store;
};

/**
 * Кастомная типизация 'dispatch', чтобы типы экшенов, схем, хранилища подхватывались TypeScript-ом
 */
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>;
