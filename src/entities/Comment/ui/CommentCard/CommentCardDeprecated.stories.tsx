import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/shared/assets/tests/storybook.jpg';

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
  title: 'entities/Comment/CommentCard/old',
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

// Dark comment card

export const Dark: Story = {
  args: { comment },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange comment card

export const Orange: Story = {
  args: { comment },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Loading primary comment card

export const LoadingPrimary: Story = {
  args: {
    isLoading: true,
  },
};

// Loading dark comment card

export const LoadingDark: Story = {
  args: {
    isLoading: true,
  },
};

LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];

// Loading orange comment card

export const LoadingOrange: Story = {
  args: {
    isLoading: true,
  },
};

LoadingOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
