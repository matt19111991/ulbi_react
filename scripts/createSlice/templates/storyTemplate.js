module.exports = (layer, componentName) => `import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ${componentName} } from './${componentName}';

const state${componentName}: DeepPartial<StateSchema> = {};

const meta = {
  title: '${layer}/${componentName}',
  component: ${componentName},
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ${componentName}>;

type Story = StoryObj<typeof meta>;

// Primary ${componentName}

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(state${componentName})];

// Dark ${componentName}

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(state${componentName}), ThemeDecorator(Theme.DARK)];

// Orange ${componentName}

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(state${componentName}), ThemeDecorator(Theme.ORANGE)];

export default meta;
`;
