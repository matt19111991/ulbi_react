import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextSize, TextTheme } from './Text';

const meta = {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof Text>;

type Story = StoryObj<typeof meta>;

// Primary Title & Text

export const PrimaryTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

// Primary Only Title

export const PrimaryOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

// Primary Only Text

export const PrimaryOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

// Dark Title & Text

export const DarkTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

DarkTitleAndText.decorators = [ThemeDecorator(Theme.DARK)];

// Dark Only Title

export const DarkOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

DarkOnlyTitle.decorators = [ThemeDecorator(Theme.DARK)];

// Dark Only Text

export const DarkOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

// Error Text

export const ErrorText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
  },
};

// Large size

export const SizeLarge: Story = {
  args: {
    size: TextSize.L,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

export default meta;
