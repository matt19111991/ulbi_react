import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

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

// Normal

export const Normal: Story =  {
  args: {
    text: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
  },
};

export default meta;
