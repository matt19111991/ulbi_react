import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleSortSelector } from './ArticleSortSelector';

const meta = {
  title: 'entities/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleSortSelector>;

type Story = StoryObj<typeof meta>;

// Primary article sort selector

export const Primary: Story = {
  args: {},
};

// Dark article sort selector

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article sort selector

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
