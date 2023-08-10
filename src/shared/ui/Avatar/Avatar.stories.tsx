import type { Meta, StoryObj } from '@storybook/react';

import AvatarImg from '@/shared/assets/tests/storybook.jpg';

import { Avatar } from './Avatar';

const meta = {
  title: 'shared/Avatar',
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

// Small avatar

export const Small: Story = {
  args: {
    size: 50,
    src: AvatarImg,
  },
};

export default meta;
