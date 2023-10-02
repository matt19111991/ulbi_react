import type { Meta, StoryObj } from '@storybook/react';

import AvatarImg from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

import { Avatar } from './Avatar';

const meta = {
  title: 'shared/components/new/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

// Primary avatar

export const Primary: Story = {
  args: {
    size: 150,
    src: AvatarImg,
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Small avatar

export const Small: Story = {
  args: {
    size: 50,
    src: AvatarImg,
  },
};

Small.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Clickable avatar

export const Clickable: Story = {
  args: {
    profileId: '1',
    src: AvatarImg,
  },
};

Clickable.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Fallback avatar

export const Fallback: Story = {
  args: {
    src: '',
  },
};

Fallback.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
