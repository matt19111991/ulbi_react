import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { FiltersContainer } from './FiltersContainer';

const meta = {
  title: 'pages/Article/Articles/components/new/FiltersContainer',
  component: FiltersContainer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof FiltersContainer>;

type Story = StoryObj<typeof meta>;

// Primary filters container

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark filters container

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange filters container

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
