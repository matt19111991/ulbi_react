import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import AdminPanelPage from './AdminPanelPage';

const stateAdminPanelPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/AdminPanelPage',
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

Primary.decorators = [StoreDecorator(stateAdminPanelPage)];

// Dark admin panel page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateAdminPanelPage), ThemeDecorator(Theme.DARK)];

// Orange admin panel page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateAdminPanelPage), ThemeDecorator(Theme.ORANGE)];

export default meta;
