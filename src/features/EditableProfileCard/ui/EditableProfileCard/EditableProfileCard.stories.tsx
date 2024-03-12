import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { profileReducer } from '../../model/slice/profileSlice';

import { EditableProfileCard } from './EditableProfileCard';

const asyncReducers: ReducersList = {
  profile: profileReducer,
};

const stateEditableProfileCard: DeepPartial<StateSchema> = {
  profile: {
    form: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'features/Profile/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof EditableProfileCard>;

type Story = StoryObj<typeof meta>;

// Primary editable profile card old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [StoreDecorator(stateEditableProfileCard, asyncReducers)];

// Dark editable profile card old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange editable profile card old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Primary editable profile card new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileCard, asyncReducers),
];

// Dark editable profile card new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange editable profile card new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
