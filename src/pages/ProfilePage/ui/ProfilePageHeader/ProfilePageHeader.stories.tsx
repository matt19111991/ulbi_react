import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ProfilePageHeader } from './ProfilePageHeader';

const stateProfileHeader: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'pages/ProfilePageHeader',
  component: ProfilePageHeader,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePageHeader>;

type Story = StoryObj<typeof meta>;

// Primary profile page header

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateProfileHeader)];

// Dark profile page header

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateProfileHeader), ThemeDecorator(Theme.DARK)];

// Orange profile page header

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateProfileHeader), ThemeDecorator(Theme.ORANGE)];

// Read only profile page header

export const ReadOnly: Story = {
  args: {},
};

const stateProfileHeaderReadOnly: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
    readonly: true,
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

ReadOnly.decorators = [StoreDecorator(stateProfileHeaderReadOnly)];

// Not editable profile page header

export const NotEditable: Story = {
  args: {},
};

const stateProfileHeaderNotEditable: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
  },
  user: {
    authData: {
      id: '2',
      username: 'Mary',
    },
  },
};

NotEditable.decorators = [StoreDecorator(stateProfileHeaderNotEditable)];

export default meta;
