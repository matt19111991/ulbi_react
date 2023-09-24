import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { CountrySelect } from './CountrySelect';

const meta = {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CountrySelect>;

type Story = StoryObj<typeof meta>;

// Primary country select old

export const PrimaryOld: Story = {
  args: {},
};

// Dark country select old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange country select old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary country select new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark country select new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange country select new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
