import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { EditableProfileCard } from './EditableProfileCard';

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

const stateEditableProfileCardRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/EditableProfileCard',
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

PrimaryOld.decorators = [StoreDecorator(stateEditableProfileCard)];

// Dark editable profile card old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.DARK)];

// Orange editable profile card old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.ORANGE)];

// Primary editable profile card new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  RedesignDecorator,
  StoreDecorator({ ...stateEditableProfileCard, ...stateEditableProfileCardRedesigned }),
];

// Dark editable profile card new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator({ ...stateEditableProfileCard, ...stateEditableProfileCardRedesigned }),
  ThemeDecorator(Theme.DARK),
];

// Orange editable profile card new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator({ ...stateEditableProfileCard, ...stateEditableProfileCardRedesigned }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
