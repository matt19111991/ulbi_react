import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text } from 'shared/ui/Text/Text';

import { Card } from './Card';

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

// Primary card

export const Primary: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

// Dark card

export const Dark: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange card

export const Orange: Story = {
  args: {
    children: <Text
      text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
      title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
    />,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
