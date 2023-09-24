import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { StarRating } from './StarRating';

const meta = {
  title: 'shared/new/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [FeatureFlagsDecorator({ isAppRedesigned: true })],
} as Meta<typeof StarRating>;

type Story = StoryObj<typeof meta>;

// Primary star rating

export const Primary: Story = {
  args: {
    onSelect: action('onSelect'),
  },
};

// Dark star rating

export const Dark: Story = {
  args: {
    onSelect: action('onSelect'),
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange star rating

export const Orange: Story = {
  args: {
    onSelect: action('onSelect'),
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Selected star rating

export const Selected: Story = {
  args: {
    onSelect: action('onSelect'),
    selectedStars: 4,
  },
};

// Small star rating

export const Small: Story = {
  args: {
    onSelect: action('onSelect'),
    size: 20,
  },
};

// Large star rating

export const Large: Story = {
  args: {
    onSelect: action('onSelect'),
    size: 50,
  },
};

export default meta;
