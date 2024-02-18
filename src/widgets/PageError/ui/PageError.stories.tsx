import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { PageError } from './PageError';

const meta = {
  title: 'widgets/Page/PageError',
  component: PageError,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof PageError>;

type Story = StoryObj<typeof meta>;

// Old primary page error

export const OldPrimary: Story = {
  args: {},
};

// Old dark page error

export const OldDark: Story = {
  args: {},
};

OldDark.decorators = [ThemeDecorator(Theme.DARK)];

// Old orange page error

export const OldOrange: Story = {
  args: {},
};

OldOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// New primary page error

export const NewPrimary: Story = {
  args: {},
};

NewPrimary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// New dark page error

export const NewDark: Story = {
  args: {},
};

NewDark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// New orange page error

export const NewOrange: Story = {
  args: {},
};

NewOrange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
