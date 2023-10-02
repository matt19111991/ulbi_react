import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Comment } from '../../model/types/comment';

import { CommentCard } from './CommentCard';

const comment: Comment = {
  id: '1',
  text: 'Test comment',
  user: {
    id: '1',
    avatar: Avatar,
    username: 'Jack',
  },
};

const meta = {
  title: 'entities/Comment/CommentCard/new',
  component: CommentCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CommentCard>;

type Story = StoryObj<typeof meta>;

// Primary comment card

export const Primary: Story = {
  args: { comment },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark comment card

export const Dark: Story = {
  args: { comment },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange comment card

export const Orange: Story = {
  args: { comment },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Loading primary comment card

export const LoadingPrimary: Story = {
  args: {
    isLoading: true,
  },
};

LoadingPrimary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Loading dark comment card

export const LoadingDark: Story = {
  args: {
    isLoading: true,
  },
};

LoadingDark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Loading orange comment card

export const LoadingOrange: Story = {
  args: {
    isLoading: true,
  },
};

LoadingOrange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
