import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ProfileCard } from './ProfileCard';

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfileCard>;

type Story = StoryObj<typeof meta>;

// Primary profile card

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

// Dark profile card

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

// Orange profile card

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

// Loading profile card

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

// Error profile card

export const Error: Story = {
  args: {
    error: 'true',
  },
};

export default meta;
