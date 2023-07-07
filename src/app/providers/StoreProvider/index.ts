import type { StateSchema, StateSchemaKey, ReduxStoreWithManager } from './config/StateSchema';
import { createReduxStore } from './config/store';

import { StoreProvider } from './ui/StoreProvider';

export {
  createReduxStore,
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
  StoreProvider,
};
