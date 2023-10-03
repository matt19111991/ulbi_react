import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { PageLoader } from './PageLoader';

const meta = {
  title: 'widgets/Page/PageLoader',
  component: PageLoader,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof PageLoader>;

type Story = StoryObj<typeof meta>;

// Primary page loader

export const Primary: Story = {
  args: {},
};

// Dark page loader

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange page loader

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
