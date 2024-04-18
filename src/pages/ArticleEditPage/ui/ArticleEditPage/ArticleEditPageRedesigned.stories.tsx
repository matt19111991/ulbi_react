import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleEditPage from './ArticleEditPage';

const meta = {
  title: 'pages/Article/ArticleEditPage/new',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleEditPage>;

type Story = StoryObj<typeof meta>;

// Primary article edit page

export const Primary: Story = {
  args: {
    storybookId: '1',
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article edit page

export const Dark: Story = {
  args: {
    storybookId: '1',
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange article edit page

export const Orange: Story = {
  args: {
    storybookId: '1',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
