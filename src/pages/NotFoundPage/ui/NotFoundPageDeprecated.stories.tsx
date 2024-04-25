import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotFoundPage } from './NotFoundPage';

const meta = {
  title: 'pages/NotFound/NotFoundPage/old',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof NotFoundPage>;

type Story = StoryObj<typeof meta>;

// Primary not found page

export const Primary: Story = {
  args: {},
};

// Dark not found page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange not found page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
