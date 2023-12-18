import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Modal } from './Modal';

const meta = {
  title: 'shared/components/new/Modal',
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
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark modal

export const Dark: Story = {
  args: {
    children: <>Modal content text</>,
    isOpen: true,
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange modal

export const Orange: Story = {
  args: {
    children: <>Modal content text</>,
    isOpen: true,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
