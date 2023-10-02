import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Text } from '../Text/Text';

import { Card } from './Card';

const meta = {
  title: 'shared/components/new/Card',
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
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
  },
};

PrimaryNormal.decorators = [IndentsDecorator];

// Dark normal card

export const DarkNormal: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
  },
};

DarkNormal.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange normal card

export const OrangeNormal: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
  },
};

OrangeNormal.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary outlined card

export const PrimaryOutlined: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'outlined',
  },
};

PrimaryOutlined.decorators = [IndentsDecorator];

// Dark outlined card

export const DarkOutlined: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'outlined',
  },
};

DarkOutlined.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange outlined card

export const OrangeOutlined: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'outlined',
  },
};

OrangeOutlined.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary light card

export const PrimaryLight: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'light',
  },
};

PrimaryLight.decorators = [IndentsDecorator];

// Dark light card

export const DarkLight: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'light',
  },
};

DarkLight.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange light card

export const OrangeLight: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    variant: 'light',
  },
};

OrangeLight.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Full width card

export const FullWidth: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    max: true,
  },
};

FullWidth.decorators = [IndentsDecorator];

// Card without padding

export const NoPadding: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    padding: '0',
  },
};

NoPadding.decorators = [IndentsDecorator];

// Card with 8px padding

export const Padding8: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    padding: '8',
  },
};

Padding8.decorators = [IndentsDecorator];

// Card with 16px padding

export const Padding16: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    padding: '16',
  },
};

Padding16.decorators = [IndentsDecorator];

// Card with 24px padding

export const Padding24: Story = {
  args: {
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
    padding: '24',
  },
};

Padding24.decorators = [IndentsDecorator];

// Card partial round

export const PartialRound: Story = {
  args: {
    border: 'partial',
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
  },
};

PartialRound.decorators = [IndentsDecorator];

// Card round

export const Round: Story = {
  args: {
    border: 'round',
    children: (
      <Text
        text='Adgium Sunt accolaes imperium superbus, fortis calceuses.'
        title='Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?'
      />
    ),
  },
};

Round.decorators = [IndentsDecorator];

export default meta;
