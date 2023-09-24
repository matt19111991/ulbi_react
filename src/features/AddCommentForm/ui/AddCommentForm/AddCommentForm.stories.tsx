import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import AddCommentForm from './AddCommentForm';

const meta = {
  title: 'features/AddCommentForm',
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

// Dark add comment form old

export const DarkOld: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange add comment form old

export const OrangeOld: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Disabled add comment form old

export const DisabledOld: Story = {
  args: {
    isLoading: true,
    onSendComment: action('onSendComment'),
  },
};

// Primary add comment form new

export const PrimaryNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark add comment form new

export const DarkNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange add comment form new

export const OrangeNew: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Disabled add comment form new

export const DisabledNew: Story = {
  args: {
    isLoading: true,
    onSendComment: action('onSendComment'),
  },
};

DisabledNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
