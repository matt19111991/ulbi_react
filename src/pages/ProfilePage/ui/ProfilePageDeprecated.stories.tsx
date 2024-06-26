import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';
import { userReducer } from '@/entities/User/testing';

import { profileReducer } from '@/features/EditableProfileCard/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import ProfilePage from './ProfilePage';

const asyncReducers: ReducersList = {
  profile: profileReducer,
  user: userReducer,
};

const stateProfile: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
    form: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      id: '1',
      lastname: 'Smith',
      username: 'Jack',
    },
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'pages/Profile/ProfilePage/old',
  component: ProfilePage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof meta>;

// Primary profile page

export const Primary: Story = {
  args: {
    storybookProfileId: '1',
  },
};

Primary.decorators = [IndentsDecorator, StoreDecorator(stateProfile, asyncReducers)];

// Dark profile page

export const Dark: Story = {
  args: {
    storybookProfileId: '1',
  },
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfile, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange profile page

export const Orange: Story = {
  args: {
    storybookProfileId: '1',
  },
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfile, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Primary profile page with rating

export const PrimaryRating: Story = {
  args: {
    storybookProfileId: '2',
  },
};

PrimaryRating.decorators = [IndentsDecorator, StoreDecorator(stateProfile, asyncReducers)];

// Dark profile page with rating

export const DarkRating: Story = {
  args: {
    storybookProfileId: '2',
  },
};

DarkRating.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfile, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange profile page with rating

export const OrangeRating: Story = {
  args: {
    storybookProfileId: '2',
  },
};

OrangeRating.decorators = [
  IndentsDecorator,
  StoreDecorator(stateProfile, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Error profile page

export const Error: Story = {
  args: {},
};

Error.decorators = [IndentsDecorator, StoreDecorator(stateProfile, asyncReducers)];

export default meta;
