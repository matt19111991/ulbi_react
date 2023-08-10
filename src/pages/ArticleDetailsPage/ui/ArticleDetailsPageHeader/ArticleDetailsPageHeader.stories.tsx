import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

const stateNotEditable: DeepPartial<StateSchema> = {};

const stateEditable: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '11',
      user: {
        id: '1',
        username: 'Jack',
      },
    },
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'pages/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsPageHeader>;

type Story = StoryObj<typeof meta>;

// Primary not editable

export const PrimaryNotEditable: Story = {
  args: {},
};

PrimaryNotEditable.decorators = [StoreDecorator(stateNotEditable)];

// Dark not editable

export const DarkNotEditable: Story = {
  args: {},
};

DarkNotEditable.decorators = [
  StoreDecorator(stateNotEditable),
  ThemeDecorator(Theme.DARK),
];

// Orange not editable

export const OrangeNotEditable: Story = {
  args: {},
};

OrangeNotEditable.decorators = [
  StoreDecorator(stateNotEditable),
  ThemeDecorator(Theme.ORANGE),
];

// Primary editable

export const PrimaryEditable: Story = {
  args: {},
};

PrimaryEditable.decorators = [StoreDecorator(stateEditable)];

// Dark editable

export const DarkEditable: Story = {
  args: {},
};

DarkEditable.decorators = [
  StoreDecorator(stateEditable),
  ThemeDecorator(Theme.DARK),
];

// Orange editable

export const OrangeEditable: Story = {
  args: {},
};

OrangeEditable.decorators = [
  StoreDecorator(stateEditable),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
