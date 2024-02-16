import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Text } from './Text';

const meta = {
  title: 'shared/components/new/Text',
  component: Text,
  argTypes: {
    backgroundColor: {
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

PrimaryTitleAndText.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Primary only title

export const PrimaryOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

PrimaryOnlyTitle.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Primary only text

export const PrimaryOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

PrimaryOnlyText.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark title & text

export const DarkTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

DarkTitleAndText.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Dark only title

export const DarkOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

DarkOnlyTitle.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Dark only text

export const DarkOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

DarkOnlyText.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange title & text

export const OrangeTitleAndText: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

OrangeTitleAndText.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Orange only title

export const OrangeOnlyTitle: Story = {
  args: {
    title: 'Title lorem ipsun',
  },
};

OrangeOnlyTitle.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Orange only text

export const OrangeOnlyText: Story = {
  args: {
    text: 'Description Description Description Description',
  },
};

OrangeOnlyText.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Error

export const Error: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    variant: 'error',
  },
};

Error.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Accent primary

export const AccentPrimary: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    variant: 'accent',
  },
};

AccentPrimary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Accent dark

export const AccentDark: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    variant: 'accent',
  },
};

AccentDark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Accent orange

export const AccentOrange: Story = {
  args: {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    variant: 'accent',
  },
};

AccentOrange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Large size

export const SizeLarge: Story = {
  args: {
    size: 'l',
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeLarge.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Medium size

export const SizeMedium: Story = {
  args: {
    size: 'm',
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeMedium.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Small size

export const SizeSmall: Story = {
  args: {
    size: 's',
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

SizeSmall.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Bold

export const Bold: Story = {
  args: {
    bold: true,
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
  },
};

Bold.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
