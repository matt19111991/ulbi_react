import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleEditPage from './ArticleEditPage';

const meta = {
  title: 'pages/Article/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleEditPage>;

type Story = StoryObj<typeof meta>;

// Primary article edit page old

export const PrimaryOld: Story = {
  args: {
    idFromStorybook: '1',
  },
};

// Dark article edit page old

export const DarkOld: Story = {
  args: {
    idFromStorybook: '1',
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article edit page old

export const OrangeOld: Story = {
  args: {
    idFromStorybook: '1',
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article edit page new

export const PrimaryNew: Story = {
  args: {
    idFromStorybook: '1',
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article edit page new

export const DarkNew: Story = {
  args: {
    idFromStorybook: '1',
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange article edit page new

export const OrangeNew: Story = {
  args: {
    idFromStorybook: '1',
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
