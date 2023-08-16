import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Page } from './Page';

const statePage: DeepPartial<StateSchema> = {
  pageScroll: {
    scroll: {},
  },
};

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

Primary.decorators = [StoreDecorator(statePage)];

// Dark page

export const Dark: Story = {
  args: {
    children: content,
  },
};

Dark.decorators = [StoreDecorator(statePage), ThemeDecorator(Theme.DARK)];

// Orange page

export const Orange: Story = {
  args: {
    children: content,
  },
};

Orange.decorators = [StoreDecorator(statePage), ThemeDecorator(Theme.ORANGE)];

export default meta;
