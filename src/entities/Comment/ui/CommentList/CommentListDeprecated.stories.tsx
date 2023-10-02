import type { Meta, StoryObj } from '@storybook/react';

import FirstAvatar from '@/shared/assets/tests/storybook.jpg';
import SecondAvatar from '@/shared/assets/tests/storybook2.jpg';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Comment } from '../../model/types/comment';

import { CommentList } from './CommentList';

const comments: Comment[] = [
  {
    id: '1',
    text: 'First comment',
    user: {
      id: '1',
      avatar: FirstAvatar,
      username: 'Jack',
    },
  },
  {
    id: '2',
    text: 'Second comment',
    user: {
      id: '2',
      avatar: SecondAvatar,
      username: 'Mary',
    },
  },
  {
    id: '3',
    text: 'Third comment',
    user: {
      id: '1',
      avatar: FirstAvatar,
      username: 'Jack',
    },
  },
];

const meta = {
  title: 'entities/Comment/CommentList/old',
  component: CommentList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CommentList>;

type Story = StoryObj<typeof meta>;

// Primary comment list

export const Primary: Story = {
  args: { comments },
};

Primary.decorators = [IndentsDecorator];

// Dark comment list

export const Dark: Story = {
  args: { comments },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange comment list

export const Orange: Story = {
  args: { comments },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Empty primary comment list

export const EmptyPrimary: Story = {
  args: {},
};

EmptyPrimary.decorators = [IndentsDecorator];

// Empty dark comment list

export const EmptyDark: Story = {
  args: {},
};

EmptyDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Empty orange comment list

export const EmptyOrange: Story = {
  args: {},
};

EmptyOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Loading primary comment list

export const LoadingPrimary: Story = {
  args: {
    isLoading: true,
  },
};

LoadingPrimary.decorators = [IndentsDecorator];

// Loading dark comment list

export const LoadingDark: Story = {
  args: {
    isLoading: true,
  },
};

LoadingDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Loading orange comment list

export const LoadingOrange: Story = {
  args: {
    isLoading: true,
  },
};

LoadingOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
