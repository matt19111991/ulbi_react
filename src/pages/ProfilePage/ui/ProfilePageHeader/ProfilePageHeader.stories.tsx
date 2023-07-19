import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import Avatar from 'shared/assets/tests/storybook.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ProfilePageHeader } from './ProfilePageHeader';

const stateProfile: DeepPartial<StateSchema> = {
   profile: {
     form: {
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

const meta = {
  title: 'pages/ProfilePage/ProfilePageHeader',
  component: ProfilePageHeader,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePageHeader>;

type Story = StoryObj<typeof meta>;

// Primary profile page header

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateProfile)];

// Dark profile page header

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateProfile), ThemeDecorator(Theme.DARK)];

// Orange profile page header

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateProfile), ThemeDecorator(Theme.ORANGE)];

// Read only profile page header

export const ReadOnly: Story = {
  args: {},
};

const stateProfileReadOnly: DeepPartial<StateSchema> = {
  profile: {
    form: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
      username: 'admin',
    },
    readonly: true,
  },
};

ReadOnly.decorators = [StoreDecorator(stateProfileReadOnly)];

// Not editable profile page header

export const NotEditable: Story = {
  args: {},
};

const stateProfileNotEditable: DeepPartial<StateSchema> = {
  profile: {
    form: {
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
  user: {
    authData: {
      id: '1',
      username: 'admin',
    },
  },
};

NotEditable.decorators = [StoreDecorator(stateProfileNotEditable)];

export default meta;
