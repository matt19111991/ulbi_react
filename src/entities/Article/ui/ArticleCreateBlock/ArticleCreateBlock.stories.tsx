import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import { ArticleCreateBlock } from './ArticleCreateBlock';

const meta = {
  title: 'entities/ArticleCreateBlock',
  component: ArticleCreateBlock,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleCreateBlock>;

type Story = StoryObj<typeof meta>;

// Primary create article code block

export const PrimaryCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

// Dark create article code block

export const DarkCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

DarkCode.decorators = [ThemeDecorator(Theme.DARK)];

// Orange create article code block

export const OrangeCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

OrangeCode.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary create article image block

export const PrimaryImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

// Dark create article image block

export const DarkImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

DarkImage.decorators = [ThemeDecorator(Theme.DARK)];

// Orange create article image block

export const OrangeImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

OrangeImage.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary create article text block

export const PrimaryText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

// Dark create article text block

export const DarkText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

DarkText.decorators = [ThemeDecorator(Theme.DARK)];

// Orange create article text block

export const OrangeText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

OrangeText.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
