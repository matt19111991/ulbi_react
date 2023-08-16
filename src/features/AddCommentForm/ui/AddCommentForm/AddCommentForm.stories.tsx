import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import AddCommentForm from './AddCommentForm';

const stateAddCommentFormActive: DeepPartial<StateSchema> = {
  articleDetailsPage: {
    comments: {
      areLoading: false,
    },
  },
};

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

// Primary add comment form

export const Primary: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Primary.decorators = [StoreDecorator(stateAddCommentFormActive)];

// Dark add comment form

export const Dark: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Dark.decorators = [
  StoreDecorator(stateAddCommentFormActive),
  ThemeDecorator(Theme.DARK),
];

// Orange add comment form

export const Orange: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Orange.decorators = [
  StoreDecorator(stateAddCommentFormActive),
  ThemeDecorator(Theme.ORANGE),
];

// Disabled add comment form

const stateAddCommentFormDisabled: DeepPartial<StateSchema> = {
  articleDetailsPage: {
    comments: {
      areLoading: true,
    },
  },
};

export const Disabled: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Disabled.decorators = [StoreDecorator(stateAddCommentFormDisabled)];

export default meta;
