import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ProfileCardDeprecated } from './ProfileCardDeprecated';

const meta = {
  title: 'entities/Profile/ProfileCard/components/ProfileCardDeprecated',
  component: ProfileCardDeprecated,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ProfileCardDeprecated>;

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
    onChangeAge: action('onChangeAge'),
    onChangeAvatar: action('onChangeAvatar'),
    onChangeCity: action('onChangeCity'),
    onChangeCountry: action('onChangeCountry'),
    onChangeCurrency: action('onChangeCurrency'),
    onChangeFirstName: action('onChangeFirstName'),
    onChangeLastName: action('onChangeLastName'),
    onChangeUserName: action('onChangeUserName'),
  },
};

Primary.decorators = [IndentsDecorator];

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
    onChangeAge: action('onChangeAge'),
    onChangeAvatar: action('onChangeAvatar'),
    onChangeCity: action('onChangeCity'),
    onChangeCountry: action('onChangeCountry'),
    onChangeCurrency: action('onChangeCurrency'),
    onChangeFirstName: action('onChangeFirstName'),
    onChangeLastName: action('onChangeLastName'),
    onChangeUserName: action('onChangeUserName'),
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

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
    onChangeAge: action('onChangeAge'),
    onChangeAvatar: action('onChangeAvatar'),
    onChangeCity: action('onChangeCity'),
    onChangeCountry: action('onChangeCountry'),
    onChangeCurrency: action('onChangeCurrency'),
    onChangeFirstName: action('onChangeFirstName'),
    onChangeLastName: action('onChangeLastName'),
    onChangeUserName: action('onChangeUserName'),
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Read only profile card

export const ReadOnly: Story = {
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
    readOnly: true,
  },
};

ReadOnly.decorators = [IndentsDecorator];

// Loading profile card

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

Loading.decorators = [IndentsDecorator];

// Error profile card

export const Error: Story = {
  args: {
    storybookError: true,
  },
};

Error.decorators = [IndentsDecorator];

export default meta;
