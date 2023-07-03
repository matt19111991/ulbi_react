import { ReactElement } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export interface StoreDecoratorOptions {
  initialState?: DeepPartial<StateSchema>;
}

export const StoreDecorator = (
  options: StoreDecoratorOptions = {},
) => (Story: StoryFn): ReactElement<unknown> => {
  const getStoreProvider = () => (
    <StoreProvider initialState={options.initialState}>
      <Story />
    </StoreProvider>
  );

  return getStoreProvider();
};
