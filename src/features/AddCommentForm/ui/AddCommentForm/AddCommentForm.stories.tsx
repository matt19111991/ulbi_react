import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import AddCommentForm from './AddCommentForm';

const meta = {
  title: 'features/Comment/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AddCommentForm>;

type Story = StoryObj<typeof meta>;

// Primary add comment form old

export const PrimaryOld: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

PrimaryOld.decorators = [IndentsDecorator];

// Dark add comment form old

export const DarkOld: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

DarkOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange add comment form old

export const OrangeOld: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

OrangeOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Disabled add comment form old

export const DisabledOld: Story = {
  args: {
    isLoading: true,
    onSendComment: action('onSendComment'),
  },
};

DisabledOld.decorators = [IndentsDecorator];

// Primary add comment form new

export const PrimaryNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark add comment form new

export const DarkNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange add comment form new

export const OrangeNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Disabled add comment form new

export const DisabledNew: Story = {
  args: {
    isLoading: true,
    onSendComment: action('onSendComment'),
  },
};

DisabledNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
