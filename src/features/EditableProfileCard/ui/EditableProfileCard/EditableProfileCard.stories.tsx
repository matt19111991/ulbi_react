import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';

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

// Primary editable profile card

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateEditableProfileCard)];

// Dark editable profile card

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.DARK)];

// Orange editable profile card

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.ORANGE)];

export default meta;
