import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { MainLayout } from './MainLayout';

const meta = {
  title: 'shared/MainLayout',
  component: MainLayout,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof MainLayout>;

type Story = StoryObj<typeof meta>;

// Primary main layout

export const Primary: Story = {
  args: {
    content: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #D0D0D0', height: '94vh', padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Sidebar</div>,
  },
};

// Dark main layout

export const Dark: Story = {
  args: {
    content: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #FFF', height: '94vh', padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Sidebar</div>,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange main layout

export const Orange: Story = {
  args: {
    content: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #D0D0D0', height: '94vh', padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Sidebar</div>,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary main layout with toolbar

export const PrimaryWithToolbar: Story = {
  args: {
    content: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #D0D0D0', minWidth: 75, padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Sidebar</div>,
    toolbar: (
      <div style={{ border: '1px solid #D0D0D0', height: '90vh', minWidth: 75, padding: 8 }}>
        Toolbar
      </div>
    ),
  },
};

// Dark main layout with toolbar

export const DarkWithToolbar: Story = {
  args: {
    content: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #FFF', minWidth: 75, padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Sidebar</div>,
    toolbar: (
      <div style={{ border: '1px solid #FFF', height: '90vh', minWidth: 75, padding: 8 }}>
        Toolbar
      </div>
    ),
  },
};

DarkWithToolbar.decorators = [ThemeDecorator(Theme.DARK)];

// Orange main layout with toolbar

export const OrangeWithToolbar: Story = {
  args: {
    content: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Content</div>,
    header: <div style={{ border: '1px solid #D0D0D0', minWidth: 75, padding: 8 }}>Header</div>,
    sidebar: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Sidebar</div>,
    toolbar: (
      <div style={{ border: '1px solid #D0D0D0', height: '90vh', minWidth: 75, padding: 8 }}>
        Toolbar
      </div>
    ),
  },
};

OrangeWithToolbar.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
