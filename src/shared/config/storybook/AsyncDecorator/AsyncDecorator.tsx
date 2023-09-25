import { ReactElement } from 'react';
// @ts-ignore
import createAsyncCallback from '@loki/create-async-callback';
import { StoryFn } from '@storybook/react';

export const AsyncDecorator = (Story: StoryFn): ReactElement<unknown> => (
  <Story onDone={createAsyncCallback()} />
);
