import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ForbiddenPage from './ForbiddenPage';

const stateForbiddenPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ForbiddenPage>;

type Story = StoryObj<typeof meta>;

// Primary forbidden page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateForbiddenPage)];

// Dark forbidden page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateForbiddenPage), ThemeDecorator(Theme.DARK)];

// Orange forbidden page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateForbiddenPage), ThemeDecorator(Theme.ORANGE)];

export default meta;
