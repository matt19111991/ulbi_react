import type { StoryFn } from '@storybook/react';

import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

// через замыкания пробрасываем 'state' и асинхронные редюсеры, затем функцию 'Story' и вызываем её

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (Story: StoryFn): JSX.Element => {
    /*
      Если вернуть 'JSX' то будет ошибка 'ESLint':
      'Component definition is missing display name(react/display-name)'
    */
    const getStory = () => (
      <StoreProvider initialState={state} asyncReducers={asyncReducers}>
        <Story />
      </StoreProvider>
    );

    return getStory();
  };
