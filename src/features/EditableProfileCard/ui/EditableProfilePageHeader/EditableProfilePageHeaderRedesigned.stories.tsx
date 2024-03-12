import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { userReducer } from '@/entities/User/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { profileReducer } from '../../model/slice/profileSlice';

import { EditableProfilePageHeader } from './EditableProfilePageHeader';

const asyncReducers: ReducersList = {
  profile: profileReducer,
  user: userReducer,
};

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
  title: 'features/Profile/EditableProfilePageHeader/new',
  component: EditableProfilePageHeader,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof EditableProfilePageHeader>;

type Story = StoryObj<typeof meta>;

// Primary editing editable profile page header

export const PrimaryEditing: Story = {
  args: {},
};

PrimaryEditing.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileHeader, asyncReducers),
];

// Dark editing editable profile page header

export const DarkEditing: Story = {
  args: {},
};

DarkEditing.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileHeader, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange editing editable profile page header

export const OrangeEditing: Story = {
  args: {},
};

OrangeEditing.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileHeader, asyncReducers),
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

NotEditing.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileHeaderNotEditing, asyncReducers),
];

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

NotEditable.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateEditableProfileHeaderNotEditable, asyncReducers),
];

export default meta;
