import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Modal } from './Modal';

const meta = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof meta>;

// Light modal

export const Light: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

// Dark modal

export const Dark: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export default meta;
