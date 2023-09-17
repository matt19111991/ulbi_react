import type { Meta, StoryObj } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ProfileCardDeprecated } from './ProfileCardDeprecated';

const meta = {
  title: 'entities/ProfileCard/old',
  component: ProfileCardDeprecated,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfileCardDeprecated>;

type Story = StoryObj<typeof meta>;

// Primary profile card old

export const Primary: Story = {
  args: {
    data: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    },
  },
};

// Dark profile card old

export const Dark: Story = {
  args: {
    data: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    },
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange profile card old

export const Orange: Story = {
  args: {
    data: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    },
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Loading profile card old

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

// Error profile card old

export const Error: Story = {
  args: {
    storybookError: true,
  },
};

export default meta;
