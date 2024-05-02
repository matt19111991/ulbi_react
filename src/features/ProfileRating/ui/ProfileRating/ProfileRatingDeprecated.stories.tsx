import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ProfileRating from './ProfileRating';

const stateProfileRating: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

const meta = {
  title: 'features/Profile/ProfileRating/old',
  component: ProfileRating,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfileRating>;

type Story = StoryObj<typeof meta>;

// Primary profile rating

export const Primary: Story = {
  args: {
    profileId: '1',
  },
};

Primary.decorators = [IndentsDecorator, StoreDecorator(stateProfileRating)];

// Dark profile rating

export const Dark: Story = {
  args: {
    profileId: '1',
  },
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfileRating),
  ThemeDecorator(Theme.DARK),
];

// Orange profile rating

export const Orange: Story = {
  args: {
    profileId: '1',
  },
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfileRating),
  ThemeDecorator(Theme.ORANGE),
];

// Loading profile rating

export const Loading: Story = {
  args: {
    profileId: '1',
    storybookLoading: true,
  },
};

Loading.decorators = [IndentsDecorator, StoreDecorator(stateProfileRating)];

// Empty profile rating

export const Empty: Story = {
  args: {
    profileId: '1',
    storybookRatingEmpty: true,
  },
};

Empty.decorators = [IndentsDecorator, StoreDecorator(stateProfileRating)];

export default meta;
