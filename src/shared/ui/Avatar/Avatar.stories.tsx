import type { Meta, StoryObj } from '@storybook/react';

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

// Normal avatar

export const NormalAvatar: Story = {
  args: {
    alt: 'avatar',
    src: '',
  },
};

export default meta;
