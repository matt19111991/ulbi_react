import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { OutletPage } from './OutletPage';

const meta = {
  title: 'pages/Outlet/OutletPage/new',
  component: OutletPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof OutletPage>;

type Story = StoryObj<typeof meta>;

// Primary outlet page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark outlet page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange outlet page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
