import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ScrollToTopButton } from './ScrollToTopButton';

const meta = {
  title: 'features/Scroll/ScrollToTopButton',
  component: ScrollToTopButton,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ScrollToTopButton>;

type Story = StoryObj<typeof meta>;

// Primary scroll to top button

export const Primary: Story = {
  args: {},
};

// Dark scroll to top button

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange scroll to top button

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
