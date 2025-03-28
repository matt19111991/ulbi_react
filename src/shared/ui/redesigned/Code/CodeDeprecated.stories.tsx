import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Code } from './Code';

const codeText =
  '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

const CodeDecorator = (Story: StoryFn, context: StoryContext) => (
  <div style={{ position: 'relative' }}>{Story({}, context)}</div>
);

const meta = {
  title: 'shared/components/old/Code',
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

Primary.decorators = [CodeDecorator, IndentsDecorator];

// Dark code

export const Dark: Story = {
  args: {
    text: codeText,
  },
};

Dark.decorators = [CodeDecorator, IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange code

export const Orange: Story = {
  args: {
    text: codeText,
  },
};

Orange.decorators = [CodeDecorator, IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
