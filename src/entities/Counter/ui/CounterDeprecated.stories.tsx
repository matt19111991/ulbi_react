import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Counter } from './Counter';

const meta = {
  title: 'entities/Counter/Counter/old',
  component: Counter,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Counter>;

type Story = StoryObj<typeof meta>;

// Primary counter

export const Primary: Story = {
  args: {},
};

Primary.decorators = [IndentsDecorator];

// Dark counter

export const Dark: Story = {
  args: {},
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange counter

export const Orange: Story = {
  args: {},
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
