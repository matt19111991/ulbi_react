import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { EditableProfileCard } from './EditableProfileCard';

const stateEditableProfileCard: DeepPartial<StateSchema> = {};

const meta = {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof EditableProfileCard>;

type Story = StoryObj<typeof meta>;

// Primary EditableProfileCard

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateEditableProfileCard)];

// Dark EditableProfileCard

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.DARK)];

// Orange EditableProfileCard

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateEditableProfileCard), ThemeDecorator(Theme.ORANGE)];

export default meta;
