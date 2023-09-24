import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Code } from './Code';

const codeText =
  '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

const meta = {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Code>;

type Story = StoryObj<typeof meta>;

// Primary code old

export const PrimaryOld: Story = {
  args: {
    text: codeText,
  },
};

// Dark code old

export const DarkOld: Story = {
  args: {
    text: codeText,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange code old

export const OrangeOld: Story = {
  args: {
    text: codeText,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary code new

export const PrimaryNew: Story = {
  args: {
    text: codeText,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark code new

export const DarkNew: Story = {
  args: {
    text: codeText,
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange code new

export const OrangeNew: Story = {
  args: {
    text: codeText,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
