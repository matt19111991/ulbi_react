import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import MainPage from './MainPage';

const stateMainPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/Main/MainPage/old',
  component: MainPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof MainPage>;

type Story = StoryObj<typeof meta>;

// Primary main page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateMainPage)];

// Dark main page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateMainPage), ThemeDecorator(Theme.DARK)];

// Orange main page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateMainPage), ThemeDecorator(Theme.ORANGE)];

export default meta;
