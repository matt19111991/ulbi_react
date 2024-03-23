import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Card } from './Card';

const Content = () => (
  <div>
    <p style={{ color: 'var(--text-redesigned)', fontSize: 24, lineHeight: '40px' }}>
      Adgium Sunt accolaes imperium superbus, fortis calceuses.
    </p>

    <p style={{ color: 'var(--text-redesigned)', fontSize: 16 }}>
      Cirpi Favere solite ducunt ad secundus clinias.Cur domus peregrinatione?
    </p>
  </div>
);

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
    children: <Content />,
  },
};

PrimaryNormal.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark normal card

export const DarkNormal: Story = {
  args: {
    children: <Content />,
  },
};

DarkNormal.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange normal card

export const OrangeNormal: Story = {
  args: {
    children: <Content />,
  },
};

OrangeNormal.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary outlined card

export const PrimaryOutlined: Story = {
  args: {
    children: <Content />,
    variant: 'outlined',
  },
};

PrimaryOutlined.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark outlined card

export const DarkOutlined: Story = {
  args: {
    children: <Content />,
    variant: 'outlined',
  },
};

DarkOutlined.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange outlined card

export const OrangeOutlined: Story = {
  args: {
    children: <Content />,
    variant: 'outlined',
  },
};

OrangeOutlined.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary light card

export const PrimaryLight: Story = {
  args: {
    children: <Content />,
    variant: 'light',
  },
};

PrimaryLight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark light card

export const DarkLight: Story = {
  args: {
    children: <Content />,
    variant: 'light',
  },
};

DarkLight.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange light card

export const OrangeLight: Story = {
  args: {
    children: <Content />,
    variant: 'light',
  },
};

OrangeLight.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Full width card

export const FullWidth: Story = {
  args: {
    children: <Content />,
    max: true,
  },
};

FullWidth.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card without padding

export const NoPadding: Story = {
  args: {
    children: <Content />,
    padding: '0',
  },
};

NoPadding.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card with 8px padding

export const Padding8: Story = {
  args: {
    children: <Content />,
    padding: '8',
  },
};

Padding8.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card with 16px padding

export const Padding16: Story = {
  args: {
    children: <Content />,
    padding: '16',
  },
};

Padding16.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card with 24px padding

export const Padding24: Story = {
  args: {
    children: <Content />,
    padding: '24',
  },
};

Padding24.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card keen round

export const KeenRound: Story = {
  args: {
    border: 'keen',
    children: <Content />,
  },
};

KeenRound.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card partial round

export const PartialRound: Story = {
  args: {
    border: 'partial',
    children: <Content />,
  },
};

PartialRound.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Card round

export const Round: Story = {
  args: {
    border: 'round',
    children: <Content />,
  },
};

Round.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
