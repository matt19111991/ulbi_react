import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from 'shared/config/storybook/TranslationDecorator/TranslationDecorator';

import { Navbar } from './Navbar';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  argsTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof meta>;

// Light navbar

export const Light: Story = {
  args: {},
};

Light.decorators = [TranslationDecorator];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK), TranslationDecorator];

export default meta;
