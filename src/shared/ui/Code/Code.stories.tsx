import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Code } from './Code';

const codeText = '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

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

// Primary code

export const Primary: Story =  {
  args: {
    text: codeText,
  },
};

// Dark code

export const Dark: Story =  {
  args: {
    text: codeText,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange code

export const Orange: Story =  {
  args: {
    text: codeText,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
