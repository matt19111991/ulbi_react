import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { FiltersContainer } from './FiltersContainer';

const meta = {
  title: 'pages/ArticlesPage/FiltersContainer',
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

// Dark filters container

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange filters container

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
