import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticlesFilters } from './ArticlesFilters';

const meta = {
  title: 'widgets/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesFilters>;

type Story = StoryObj<typeof meta>;

// Primary article filters

export const Primary: Story = {
  args: {},
};

// Dark article filters

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article filters

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Loading article filters

export const Loading: Story = {
  args: {
    areLoading: true,
  },
};

export default meta;
