import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import AdminPanelPage from './AdminPanelPage';

const meta = {
  title: 'pages/Admin/AdminPanelPage/old',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AdminPanelPage>;

type Story = StoryObj<typeof meta>;

// Primary admin panel page

export const Primary: Story = {
  args: {},
};

// Dark admin panel page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange admin panel page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
