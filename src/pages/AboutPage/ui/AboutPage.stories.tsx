import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import AboutPage from './AboutPage';

const stateAboutPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AboutPage>;

type Story = StoryObj<typeof meta>;

// Primary about page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateAboutPage)];

// Dark about page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateAboutPage), ThemeDecorator(Theme.DARK)];

// Orange about page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateAboutPage), ThemeDecorator(Theme.ORANGE)];

export default meta;
