import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import AddCommentForm from './AddCommentForm';

const stateAddCommentForm: DeepPartial<StateSchema> = {};

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

Primary.decorators = [StoreDecorator(stateAddCommentForm)];

// Dark add comment form

export const Dark: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Dark.decorators = [StoreDecorator(stateAddCommentForm), ThemeDecorator(Theme.DARK)];

// Orange add comment form

export const Orange: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

Orange.decorators = [StoreDecorator(stateAddCommentForm), ThemeDecorator(Theme.ORANGE)];

export default meta;
