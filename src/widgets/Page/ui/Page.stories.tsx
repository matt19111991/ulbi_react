import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Page } from './Page';

const content = new Array(100)
  .fill(0)
  // eslint-disable-next-line react/no-array-index-key
  .map((_, idx) => (<div key={idx}>Test block {idx}</div>));

const meta = {
  title: 'widgets/Page',
  component: Page,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Page>;

type Story = StoryObj<typeof meta>;

// Primary page

export const Primary: Story = {
  args: {
    children: content,
  },
};

// Dark page

export const Dark: Story = {
  args: {
    children: content,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange page

export const Orange: Story = {
  args: {
    children: content,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
