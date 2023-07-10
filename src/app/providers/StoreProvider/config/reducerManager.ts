import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// для асинхронной подгрузки редюсеров, 'createReducerManager' взят из документации

export const createReducerManager = (
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager => {
  // Создаем клон с редюсерами (т.к. будем этот клон изменять)
  const reducers = { ...initialReducers };

  // Создаем корневой редюсер
  let combinedReducer = combineReducers(reducers);

  // Названия редюсеров, которые хотим удалить (которые будут асинхронными)
  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,

    // Root reducer без редюсеров, указанных в 'keysToRemove'
    reduce: (state: StateSchema, action: AnyAction) => {
      // Если какие-то редюсеры были удалены, очищаем 'state' от них
      if (keysToRemove.length > 0) {
        state = { ...state };

        keysToRemove.forEach((key) => {
          delete state[key];
        });

        keysToRemove = [];
      }

      // Передаем очищенный 'state' в 'combined reducer'
      return combinedReducer(state, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // По ключу добавляем редюсер
      reducers[key] = reducer;

      // Создаем новый 'combinedReducer'
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Удаляем редюсер по ключу
      delete reducers[key];

      // Добавляем ключ в список ключей для очистки
      keysToRemove.push(key);

      // Создаем новый 'combinedReducer'
      combinedReducer = combineReducers(reducers);
    },
  };
};