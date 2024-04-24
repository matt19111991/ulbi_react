import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticlePageGreeting } from './ArticlePageGreeting';

const meta = {
  title: 'features/Article/ArticlePageGreeting/old',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'lg',
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof ArticlePageGreeting>;

type Story = StoryObj<typeof meta>;

// Large primary article page greeting

export const LargePrimary: Story = {
  args: {},
};

// Large dark article page greeting

export const LargeDark: Story = {
  args: {},
};

LargeDark.decorators = [ThemeDecorator(Theme.DARK)];

// Large orange article page greeting

export const LargeOrange: Story = {
  args: {},
};

LargeOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Small primary article page greeting

export const SmallPrimary: Story = {
  args: {
    storybookMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

// Small dark article page greeting

export const SmallDark: Story = {
  args: {
    storybookMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

SmallDark.decorators = [ThemeDecorator(Theme.DARK)];

// Small orange article page greeting

export const SmallOrange: Story = {
  args: {
    storybookMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

SmallOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
