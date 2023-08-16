import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotFoundPage } from './NotFoundPage';

const stateNotFoundPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof NotFoundPage>;

type Story = StoryObj<typeof meta>;

// Primary not found page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateNotFoundPage)];

// Dark not found page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateNotFoundPage), ThemeDecorator(Theme.DARK)];

// Orange not found page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateNotFoundPage), ThemeDecorator(Theme.ORANGE)];

export default meta;
