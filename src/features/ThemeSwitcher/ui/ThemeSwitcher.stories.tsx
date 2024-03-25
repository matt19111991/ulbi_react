import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'features/Theme/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof meta>;

// Theme switcher old

export const Old: Story = {
  args: {},
};

Old.decorators = [IndentsDecorator];

// Theme switcher new

export const New: Story = {
  args: {},
};

New.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
