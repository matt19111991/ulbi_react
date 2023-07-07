import { ReactElement } from 'react';
import { DeepPartial } from '@reduxjs/toolkit';
import type { StoryFn } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
) => (Story: StoryFn): ReactElement<unknown> => {
  const getStoreProvider = () => (
    <StoreProvider initialState={state}>
      <Story />
    </StoreProvider>
  );

  return getStoreProvider();
};
