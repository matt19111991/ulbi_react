import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

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
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof meta>;

// Primary profile page

export const Primary: Story = {
  args: {
    storybookUserId: '1',
  },
};

Primary.decorators = [StoreDecorator(stateProfile)];

// Dark profile page

export const Dark: Story = {
  args: {
    storybookUserId: '1',
  },
};

Dark.decorators = [StoreDecorator(stateProfile), ThemeDecorator(Theme.DARK)];

// Orange profile page

export const Orange: Story = {
  args: {
    storybookUserId: '1',
  },
};

Orange.decorators = [StoreDecorator(stateProfile), ThemeDecorator(Theme.ORANGE)];

// Error profile page

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateProfile)];

export default meta;
