import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

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
  title: 'pages/Article/ArticleDetailsPage/ArticleDetailsPageHeader',
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

PrimaryNotEditable.decorators = [IndentsDecorator, StoreDecorator(stateNotEditable)];

// Dark not editable

export const DarkNotEditable: Story = {
  args: {},
};

DarkNotEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateNotEditable),
  ThemeDecorator(Theme.DARK),
];

// Orange not editable

export const OrangeNotEditable: Story = {
  args: {},
};

OrangeNotEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateNotEditable),
  ThemeDecorator(Theme.ORANGE),
];

// Primary editable

export const PrimaryEditable: Story = {
  args: {},
};

PrimaryEditable.decorators = [IndentsDecorator, StoreDecorator(stateEditable)];

// Dark editable

export const DarkEditable: Story = {
  args: {},
};

DarkEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateEditable),
  ThemeDecorator(Theme.DARK),
];

// Orange editable

export const OrangeEditable: Story = {
  args: {},
};

OrangeEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateEditable),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
