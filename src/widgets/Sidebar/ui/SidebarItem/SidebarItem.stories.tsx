import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { SidebarItemsList } from '../../model/items';

import { SidebarItem } from './SidebarItem';

const stateSidebarItem: DeepPartial<StateSchema> = {};

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
    item: SidebarItemsList.at(0),
  },
};

Primary.decorators = [StoreDecorator(stateSidebarItem)];

// Dark sidebar item

export const Dark: Story = {
  args: {
    item: SidebarItemsList.at(0),
  },
};

Dark.decorators = [StoreDecorator(stateSidebarItem), ThemeDecorator(Theme.DARK)];

// Orange sidebar item

export const Orange: Story = {
  args: {
    item: SidebarItemsList.at(0),
  },
};

Orange.decorators = [StoreDecorator(stateSidebarItem), ThemeDecorator(Theme.ORANGE)];

export default meta;
