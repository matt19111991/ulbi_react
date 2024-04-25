import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ForbiddenPage } from './ForbiddenPage';

const meta = {
  title: 'pages/Forbidden/ForbiddenPage/old',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ForbiddenPage>;

type Story = StoryObj<typeof meta>;

// Primary forbidden page

export const Primary: Story = {
  args: {},
};

// Dark forbidden page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange forbidden page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
