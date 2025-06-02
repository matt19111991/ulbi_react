import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Modal } from './Modal';

const meta = {
  title: 'shared/components/old/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof meta>;

// Primary modal

export const Primary: Story = {
  args: {
    children: <>Modal content text</>,
    isOpen: true,
    onClose: action('onClose'),
  },
};

// Dark modal

export const Dark: Story = {
  args: {
    children: <>Modal content text</>,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange modal

export const Orange: Story = {
  args: {
    children: <>Modal content text</>,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
