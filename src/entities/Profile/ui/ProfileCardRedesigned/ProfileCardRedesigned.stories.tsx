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

import { ProfileCardRedesigned } from './ProfileCardRedesigned';

const stateProfileCardRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'entities/ProfileCard/new',
  component: ProfileCardRedesigned,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [RedesignDecorator, StoreDecorator(stateProfileCardRedesigned)],
} as Meta<typeof ProfileCardRedesigned>;

type Story = StoryObj<typeof meta>;

// Primary profile card new

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

// Dark profile card new

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

// Orange profile card new

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

// Loading profile card new

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

// Error profile card new

export const Error: Story = {
  args: {
    storybookError: true,
  },
};

export default meta;
