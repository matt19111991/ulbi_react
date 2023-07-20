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

// Error text

export const ErrorText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
  },
};

// Large size text

export const SizeLarge: Story = {
  args: {
    size: TextSize.L,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

export default meta;
