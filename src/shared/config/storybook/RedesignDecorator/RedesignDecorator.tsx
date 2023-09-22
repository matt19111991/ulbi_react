import { ReactElement } from 'react';
import type { StoryFn } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { setFeatureFlags } from '@/shared/lib/features';

export const redesignState: DeepPartial<StateSchema> = {
  user: {
    authData: {
      features: {
        isAppRedesigned: true,
      },
    },
  },
};

export const RedesignDecorator = (Story: StoryFn): ReactElement => {
  setFeatureFlags({
    isAppRedesigned: true,
  });

  localStorage.setItem(LAST_DESIGN_LOCALSTORAGE_KEY, 'new');

  return <Story />;
};
