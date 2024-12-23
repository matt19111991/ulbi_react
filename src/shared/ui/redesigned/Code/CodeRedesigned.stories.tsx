import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Code } from './Code';

const codeText =
  '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

const CodeDecorator = (Story: ReturnType<StoryFn>) => (
  <div style={{ position: 'relative' }}>
    <Story />
  </div>
);

const meta = {
  title: 'shared/components/new/Code',
  component: Code,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Code>;

type Story = StoryObj<typeof meta>;

// Primary code

export const Primary: Story = {
  args: {
    text: codeText,
  },
};

Primary.decorators = [
  CodeDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Dark code

export const Dark: Story = {
  args: {
    text: codeText,
  },
};

Dark.decorators = [
  CodeDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange code

export const Orange: Story = {
  args: {
    text: codeText,
  },
};

Orange.decorators = [
  CodeDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
