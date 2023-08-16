import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/shared/assets/tests/storybook3.svg';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { RoutePath } from '@/shared/const/router';
import { Theme } from '@/shared/const/theme';

import { SidebarItem } from './SidebarItem';

const stateSidebarItem: DeepPartial<StateSchema> = {};

const sidebarItem = {
  Icon,
  order: 1,
  path: RoutePath.main,
  text: 'Главная',
};

const meta = {
  title: 'widgets/SidebarItem',
  component: SidebarItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof SidebarItem>;

type Story = StoryObj<typeof meta>;

// Primary sidebar item

export const Primary: Story = {
  args: {
    item: sidebarItem,
  },
};

Primary.decorators = [StoreDecorator(stateSidebarItem)];

// Dark sidebar item

export const Dark: Story = {
  args: {
    item: sidebarItem,
  },
};

Dark.decorators = [StoreDecorator(stateSidebarItem), ThemeDecorator(Theme.DARK)];

// Orange sidebar item

export const Orange: Story = {
  args: {
    item: sidebarItem,
  },
};

Orange.decorators = [StoreDecorator(stateSidebarItem), ThemeDecorator(Theme.ORANGE)];

export default meta;
