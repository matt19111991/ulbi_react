import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
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
  title: 'features/Profile/ProfileRating',
  component: ProfileRating,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfileRating>;

type Story = StoryObj<typeof meta>;

// Primary profile rating old

export const PrimaryOld: Story = {
  args: {
    profileId: '1',
  },
};

PrimaryOld.decorators = [StoreDecorator(stateProfileRating)];

// Dark profile rating old

export const DarkOld: Story = {
  args: {
    profileId: '1',
  },
};

DarkOld.decorators = [StoreDecorator(stateProfileRating), ThemeDecorator(Theme.DARK)];

// Orange profile rating old

export const OrangeOld: Story = {
  args: {
    profileId: '1',
  },
};

OrangeOld.decorators = [StoreDecorator(stateProfileRating), ThemeDecorator(Theme.ORANGE)];

// Loading profile rating old

export const LoadingOld: Story = {
  args: {
    profileId: '1',
    storybookLoading: true,
  },
};

LoadingOld.decorators = [StoreDecorator(stateProfileRating)];

// Empty profile rating old

export const EmptyOld: Story = {
  args: {
    profileId: '1',
    storybookRatingEmpty: true,
  },
};

EmptyOld.decorators = [StoreDecorator(stateProfileRating)];

// Primary profile rating new

export const PrimaryNew: Story = {
  args: {
    profileId: '1',
  },
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateProfileRating),
];

// Dark profile rating new

export const DarkNew: Story = {
  args: {
    profileId: '1',
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateProfileRating),
  ThemeDecorator(Theme.DARK),
];

// Orange profile rating new

export const OrangeNew: Story = {
  args: {
    profileId: '1',
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateProfileRating),
  ThemeDecorator(Theme.ORANGE),
];

// Loading profile rating new

export const LoadingNew: Story = {
  args: {
    profileId: '1',
    storybookLoading: true,
  },
};

LoadingNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateProfileRating),
];

// Empty profile rating new

export const EmptyNew: Story = {
  args: {
    profileId: '1',
    storybookRatingEmpty: true,
  },
};

EmptyNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateProfileRating),
];

export default meta;
