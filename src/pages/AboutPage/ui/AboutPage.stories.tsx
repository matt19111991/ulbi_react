import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from 'shared/config/storybook/TranslationDecorator/TranslationDecorator';

import AboutPage from './AboutPage';

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AboutPage>;

type Story = StoryObj<typeof meta>;

// Normal about page

export const Normal: Story = {
  args: {},
};

Normal.decorators = [TranslationDecorator];

// Dark about page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK), TranslationDecorator];

export default meta;
