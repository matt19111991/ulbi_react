import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Code } from './Code';

const codeText =
  '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

const stateCodeRedesigned: DeepPartial<StateSchema> = redesignState;

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

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateCodeRedesigned)];

// Dark code new

export const DarkNew: Story = {
  args: {
    text: codeText,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateCodeRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange code new

export const OrangeNew: Story = {
  args: {
    text: codeText,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateCodeRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
