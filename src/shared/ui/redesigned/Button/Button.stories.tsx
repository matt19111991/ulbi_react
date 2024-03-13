import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import IconSvg from '@/shared/assets/tests/storybook3.svg';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Button } from './Button';

const meta = {
  title: 'shared/components/new/Button',
  component: Button,
  args: {
    onClick: action('onClick'),
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

// Primary clear button

export const PrimaryClear: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

// Dark clear button

export const DarkClear: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

DarkClear.decorators = [ThemeDecorator(Theme.DARK)];

// Orange clear button

export const OrangeClear: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

OrangeClear.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary filled button

export const PrimaryFilled: Story = {
  args: {
    children: 'Text',
    variant: 'filled',
  },
};

// Dark filled button

export const DarkFilled: Story = {
  args: {
    children: 'Text',
    variant: 'filled',
  },
};

DarkFilled.decorators = [ThemeDecorator(Theme.DARK)];

// Orange filled button

export const OrangeFilled: Story = {
  args: {
    children: 'Text',
    variant: 'filled',
  },
};

OrangeFilled.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary outline button

export const PrimaryOutline: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

// Dark outline button

export const DarkOutline: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

DarkOutline.decorators = [ThemeDecorator(Theme.DARK)];

// Orange outline button

export const OrangeOutline: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

OrangeOutline.decorators = [ThemeDecorator(Theme.ORANGE)];

// Outline small button

export const OutlineSmall: Story = {
  args: {
    children: 'Text',
    size: 's',
    variant: 'outline',
  },
};

// Outline large button

export const OutlineLarge: Story = {
  args: {
    children: 'Text',
    size: 'l',
    variant: 'outline',
  },
};

// Outline extra large button

export const OutlineExtraLarge: Story = {
  args: {
    children: 'Text',
    size: 'xl',
    variant: 'outline',
  },
};

// Square medium button

export const SquareMedium: Story = {
  args: {
    children: '>',
    square: true,
    variant: 'outline',
  },
};

// Square large button

export const SquareLarge: Story = {
  args: {
    children: '>',
    size: 'l',
    square: true,
    variant: 'outline',
  },
};

// Square extra large button

export const SquareExtraLarge: Story = {
  args: {
    children: '>',
    size: 'xl',
    square: true,
    variant: 'outline',
  },
};

// Disabled button

export const Disabled: Story = {
  args: {
    children: 'Text',
    disabled: true,
    variant: 'outline',
  },
};

// Full width button

export const FullWidth: Story = {
  args: {
    children: 'Text',
    fullWidth: true,
    variant: 'outline',
  },
};

// Button with addon left

export const AddonLeft: Story = {
  args: {
    addonLeft: (
      <div style={{ alignItems: 'center', display: 'flex', margin: '0 8px 2px 0' }}>
        <IconSvg />
      </div>
    ),
    children: 'Text',
    variant: 'outline',
  },
};

// Button with addon right

export const AddonRight: Story = {
  args: {
    addonRight: (
      <div style={{ alignItems: 'center', display: 'flex', margin: '0 0 2px 8px' }}>
        <IconSvg />
      </div>
    ),
    children: 'Text',
    variant: 'outline',
  },
};

// Button error

export const Error: Story = {
  args: {
    children: 'Text',
    color: 'error',
  },
};

// Button success

export const Success: Story = {
  args: {
    children: 'Text',
    color: 'success',
  },
};

export default meta;
