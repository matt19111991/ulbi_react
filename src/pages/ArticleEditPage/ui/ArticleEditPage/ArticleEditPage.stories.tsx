import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ArticleEditPage from './ArticleEditPage';

const stateArticleEditPage: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleEditPage>;

type Story = StoryObj<typeof meta>;

// Primary article create page

export const PrimaryCreate: Story = {
  args: {},
};

PrimaryCreate.decorators = [StoreDecorator(stateArticleEditPage)];

// Dark article create page

export const DarkCreate: Story = {
  args: {},
};

DarkCreate.decorators = [
  StoreDecorator(stateArticleEditPage),
  ThemeDecorator(Theme.DARK),
];

// Orange article create page

export const OrangeCreate: Story = {
  args: {},
};

OrangeCreate.decorators = [
  StoreDecorator(stateArticleEditPage),
  ThemeDecorator(Theme.ORANGE),
];

// Primary article edit page

export const PrimaryEdit: Story = {
  args: {
    idFromStorybook: '1',
  },
};

PrimaryEdit.decorators = [StoreDecorator(stateArticleEditPage)];

// Dark article edit page

export const DarkEdit: Story = {
  args: {
    idFromStorybook: '1',
  },
};

DarkEdit.decorators = [
  StoreDecorator(stateArticleEditPage),
  ThemeDecorator(Theme.DARK),
];

// Orange article edit page

export const OrangeEdit: Story = {
  args: {
    idFromStorybook: '1',
  },
};

OrangeEdit.decorators = [
  StoreDecorator(stateArticleEditPage),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
