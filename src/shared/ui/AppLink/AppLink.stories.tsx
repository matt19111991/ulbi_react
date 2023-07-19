import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  args: {
    to: '/test', // для всех stories
  },
} as Meta<typeof AppLink>;

type Story = StoryObj<typeof meta>;

// Primary light app link

export const PrimaryLight: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.PRIMARY,
  },
};

// Secondary light app link

export const SecondaryLight: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.SECONDARY,
  },
};

// Red light app link

export const RedLight: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.RED,
  },
};

// Primary dark app link

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.PRIMARY,
  },
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// Secondary dark app link

export const SecondaryDark: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.SECONDARY,
  },
};

SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

// Red dark app link

export const RedDark: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.RED,
  },
};

RedDark.decorators = [ThemeDecorator(Theme.DARK)];

// Primary orange app link

export const PrimaryOrange: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.PRIMARY,
  },
};

PrimaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Secondary orange app link

export const SecondaryOrange: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.SECONDARY,
  },
};

SecondaryOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Red orange app link

export const RedOrange: Story = {
  args: {
    children: 'Text',
    invertedTheme: AppLinkTheme.RED,
  },
};

RedOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
