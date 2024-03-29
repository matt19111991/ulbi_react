import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Card, CardTheme } from './Card';

const Content = () => (
  <>
    <p style={{ color: 'var(--primary-color)', fontSize: 24, lineHeight: '40px' }}>
      Adgium Sunt accolaes imperium superbus, fortis calceuses.
    </p>

    <p style={{ color: 'var(--primary-color)', fontSize: 16 }}>
      Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?
    </p>
  </>
);

const meta = {
  title: 'shared/components/old/Card',
  component: Card,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

// Primary normal card

export const PrimaryNormal: Story = {
  args: {
    children: <Content />,
  },
};

PrimaryNormal.decorators = [IndentsDecorator];

// Dark normal card

export const DarkNormal: Story = {
  args: {
    children: <Content />,
  },
};

DarkNormal.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange normal card

export const OrangeNormal: Story = {
  args: {
    children: <Content />,
  },
};

OrangeNormal.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary outlined card

export const PrimaryOutlined: Story = {
  args: {
    children: <Content />,
    theme: CardTheme.OUTLINED,
  },
};

PrimaryOutlined.decorators = [IndentsDecorator];

// Dark outlined card

export const DarkOutlined: Story = {
  args: {
    children: <Content />,
    theme: CardTheme.OUTLINED,
  },
};

DarkOutlined.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange outlined card

export const OrangeOutlined: Story = {
  args: {
    children: <Content />,
    theme: CardTheme.OUTLINED,
  },
};

OrangeOutlined.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Full width card

export const FullWidth: Story = {
  args: {
    children: <Content />,
    max: true,
  },
};

export default meta;
