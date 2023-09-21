import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { RedesignDecorator } from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { EditableProfilePageHeader } from './EditableProfilePageHeader';

const stateEditableProfileHeader: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
  },
  user: {
    authData: {
      features: {
        isAppRedesigned: true,
      },
      id: '1',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'features/EditableProfilePageHeader/new',
  component: EditableProfilePageHeader,
  argTypes: {
    background: {
      control: 'color',
    },
  },
  decorators: [RedesignDecorator],
} as Meta<typeof EditableProfilePageHeader>;

type Story = StoryObj<typeof meta>;

// Primary editing editable profile page header

export const PrimaryEditing: Story = {
  args: {},
};

PrimaryEditing.decorators = [StoreDecorator(stateEditableProfileHeader)];

// Dark editing editable profile page header

export const DarkEditing: Story = {
  args: {},
};

DarkEditing.decorators = [StoreDecorator(stateEditableProfileHeader), ThemeDecorator(Theme.DARK)];

// Orange editing editable profile page header

export const OrangeEditing: Story = {
  args: {},
};

OrangeEditing.decorators = [
  StoreDecorator(stateEditableProfileHeader),
  ThemeDecorator(Theme.ORANGE),
];

// Not editing editable profile page header

export const NotEditing: Story = {
  args: {},
};

const stateEditableProfileHeaderNotEditing: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
    readonly: true,
  },
  user: {
    authData: {
      features: {
        isAppRedesigned: true,
      },
      id: '1',
      username: 'Jack',
    },
  },
};

NotEditing.decorators = [StoreDecorator(stateEditableProfileHeaderNotEditing)];

// Not editable profile page header

export const NotEditable: Story = {
  args: {},
};

const stateEditableProfileHeaderNotEditable: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
  },
  user: {
    authData: {
      features: {
        isAppRedesigned: true,
      },
      id: '2',
      username: 'Mary',
    },
  },
};

NotEditable.decorators = [StoreDecorator(stateEditableProfileHeaderNotEditable)];

export default meta;
