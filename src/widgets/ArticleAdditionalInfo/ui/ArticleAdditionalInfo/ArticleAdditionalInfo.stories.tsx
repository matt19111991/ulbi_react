import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { User } from '@/entities/User/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { article } from '@/shared/lib/generators/articles';

import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';

const user: User = {
  id: '1',
  avatar: Avatar,
  username: 'Jack',
};

const meta = {
  title: 'widgets/Article/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  args: {
    author: user,
    createdAt: article.createdAt,
    isStorybook: true,
    onEdit: action('onEdit'),
    views: article.views,
  },
} as Meta<typeof ArticleAdditionalInfo>;

type Story = StoryObj<typeof meta>;

// Primary article additional info

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article additional info

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article additional info

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
