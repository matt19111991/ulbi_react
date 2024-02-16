import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Text, TextSize, TextTheme } from './Text';

const meta = {
  title: 'shared/components/old/Text',
  component: Text,
  argTypes: {
    backgroundControl: {
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

PrimaryTitleAndText.decorators = [IndentsDecorator];

// Primary only title

export const PrimaryOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

PrimaryOnlyTitle.decorators = [IndentsDecorator];

// Primary only text

export const PrimaryOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

PrimaryOnlyText.decorators = [IndentsDecorator];

// Dark title & text

export const DarkTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

DarkTitleAndText.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Dark only title

export const DarkOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

DarkOnlyTitle.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Dark only text

export const DarkOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

DarkOnlyText.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange title & text

export const OrangeTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

OrangeTitleAndText.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Orange only title

export const OrangeOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

OrangeOnlyTitle.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Orange only text

export const OrangeOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

OrangeOnlyText.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Error

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.ERROR,
  },
};

Error.decorators = [IndentsDecorator];

// Inverted primary

export const InvertedPrimary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

InvertedPrimary.decorators = [IndentsDecorator];

// Inverted dark

export const InvertedDark: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

InvertedDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Inverted orange

export const InvertedOrange: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: TextTheme.INVERTED,
  },
};

InvertedOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Large size

export const SizeLarge: Story = {
  args: {
    size: TextSize.L,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeLarge.decorators = [IndentsDecorator];

// Medium size

export const SizeMedium: Story = {
  args: {
    size: TextSize.M,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeMedium.decorators = [IndentsDecorator];

// Small size

export const SizeSmall: Story = {
  args: {
    size: TextSize.S,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeSmall.decorators = [IndentsDecorator];

export default meta;
