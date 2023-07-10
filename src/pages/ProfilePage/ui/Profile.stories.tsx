import type { Meta, StoryObj } from '@storybook/react';

import ProfilePage from './ProfilePage';

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
