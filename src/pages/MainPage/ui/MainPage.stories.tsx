import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import MainPage from './MainPage';

const options =  {
  initialState: {
    counter: {
      value: 10,
    },
  },
};

const meta = {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof MainPage>;

type Story = StoryObj<typeof meta>;

// Normal main page

export const Normal: Story = {
  args: {},
};

Normal.decorators = [StoreDecorator(options)];

// Dark main page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(options), ThemeDecorator(Theme.DARK)];

export default meta;
