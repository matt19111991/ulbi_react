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

// Primary title & text

export const PrimaryTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

// Primary only title

export const PrimaryOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

// Primary only text

export const PrimaryOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

// Dark title & text

export const DarkTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

DarkTitleAndText.decorators = [ThemeDecorator(Theme.DARK)];

// Dark only title

export const DarkOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

DarkOnlyTitle.decorators = [ThemeDecorator(Theme.DARK)];

// Dark only text

export const DarkOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

DarkOnlyText.decorators = [ThemeDecorator(Theme.DARK)];

// Orange title & text

export const OrangeTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

OrangeTitleAndText.decorators = [ThemeDecorator(Theme.ORANGE)];

// Orange only title

export const OrangeOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

OrangeOnlyTitle.decorators = [ThemeDecorator(Theme.ORANGE)];

// Orange only text

export const OrangeOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

OrangeOnlyText.decorators = [ThemeDecorator(Theme.ORANGE)];

// Error

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
  },
};

// Inverted primary

export const InvertedPrimary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

// Inverted dark

export const InvertedDark: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

// Inverted orange

export const InvertedOrange: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

InvertedOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Large size

export const SizeLarge: Story = {
  args: {
    size: TextSize.L,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

// Medium size

export const SizeMedium: Story = {
  args: {
    size: TextSize.M,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

// Small size

export const SizeSmall: Story = {
  args: {
    size: TextSize.S,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

export default meta;
