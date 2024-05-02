import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
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
      id: '1',
      lastname: 'Smith',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'features/Profile/EditableProfileCard/new',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof EditableProfileCard>;

type Story = StoryObj<typeof meta>;

// Primary editable profile card

export const Primary: Story = {
  args: {},
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateEditableProfileCard, asyncReducers),
];

// Dark editable profile card

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange editable profile card

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateEditableProfileCard, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
