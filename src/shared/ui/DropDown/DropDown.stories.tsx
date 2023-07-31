import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button } from '../Button/Button';

import { DropDown } from './DropDown';

const meta = {
  title: 'shared/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof DropDown>;

type Story = StoryObj<typeof meta>;

// Primary dropdown

export const Primary: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Second item' },
      { content: 'Third item' },
    ],
    trigger: <Button>Open</Button>,
  },
};

// Dark dropdown

export const Dark: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Second item' },
      { content: 'Third item' },
    ],
    trigger: <Button>Open</Button>,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange dropdown

export const Orange: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Second item' },
      { content: 'Third item' },
    ],
    trigger: <Button>Open</Button>,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
