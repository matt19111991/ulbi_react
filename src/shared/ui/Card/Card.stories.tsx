import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text } from 'shared/ui/Text/Text';

import { Card, CardTheme } from './Card';

const meta = {
  title: 'shared/Card',
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
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

// Dark normal card

export const DarkNormal: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

DarkNormal.decorators = [ThemeDecorator(Theme.DARK)];

// Orange normal card

export const OrangeNormal: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

OrangeNormal.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary outlined card

export const PrimaryOutlined: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
    theme: CardTheme.OUTLINED,
  },
};

// Dark outlined card

export const DarkOutlined: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
    theme: CardTheme.OUTLINED,
  },
};

DarkOutlined.decorators = [ThemeDecorator(Theme.DARK)];

// Orange outlined card

export const OrangeOutlined: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
    theme: CardTheme.OUTLINED,
  },
};

OrangeOutlined.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
