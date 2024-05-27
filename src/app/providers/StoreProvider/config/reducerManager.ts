import { combineReducers } from '@reduxjs/toolkit';
import type { Reducer, ReducersMapObject, UnknownAction } from '@reduxjs/toolkit';

import type { MountedReducers, ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// для асинхронной подгрузки редюсеров (RTK v.1 code splitting)

// 'createReducerManager' взят из документации
export const createReducerManager = (
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager => {
  // Создаем клон с редюсерами (т.к. будем этот клон изменять)
  const clonedReducers = { ...initialReducers };

  // Создаем корневой редюсер
  let combinedReducer = combineReducers(clonedReducers);

  // Названия асинхронных редюсеров, которые хотим удалить
  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => clonedReducers,

    // Можно было обойтись 'getReducerMap()', по сути 'getMountedReducers()' дублирующий функционал
    getMountedReducers: () => mountedReducers,

    // 'rootReducer' без редюсеров, указанных в 'keysToRemove'
    reduce: (state: StateSchema, action: UnknownAction) => {
      // Если какие-то редюсеры были удалены, очищаем 'state' от них
      if (keysToRemove.length > 0) {
        // eslint-disable-next-line no-param-reassign
        state = { ...state };

        keysToRemove.forEach((key) => {
          delete state[key];
        });

        keysToRemove = [];
      }

      // Передаем очищенный 'state' в 'combined reducer'
      return combinedReducer(state as RequiredFieldsOnly<StateSchema>, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      // если не передали ключ или ключ уже есть среди редюсеров - ничего не делаем
      if (!key || clonedReducers[key]) {
        return;
      }

      // По ключу добавляем редюсер
      clonedReducers[key] = reducer;

      // и отмечаем, что редюсер был вмонтирован
      mountedReducers[key] = true;

      // Создаем новый 'combinedReducer'
      combinedReducer = combineReducers(clonedReducers);
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !clonedReducers[key]) {
        return;
      }

      // Удаляем редюсер по ключу
      delete clonedReducers[key];

      // Добавляем ключ в список ключей для очистки
      keysToRemove.push(key);

      // и отмечаем, что редюсер был демонтирован
      mountedReducers[key] = false;

      // Создаем новый 'combinedReducer'
      combinedReducer = combineReducers(clonedReducers);
    },
  };
};
