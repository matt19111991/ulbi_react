import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Modal } from './Modal';

const stateModalRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof meta>;

// Primary modal old

export const PrimaryOld: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

// Dark modal old

export const DarkOld: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange modal old

export const OrangeOld: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary modal new

export const PrimaryNew: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateModalRedesigned)];

// Dark modal new

export const DarkNew: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateModalRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange modal new

export const OrangeNew: Story = {
  args: {
    // eslint-disable-next-line i18next/no-literal-string
    children: <>Modal content text</>,
    isOpen: true,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateModalRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
