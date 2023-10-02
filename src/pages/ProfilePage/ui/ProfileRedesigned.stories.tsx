import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

const stateProfile: DeepPartial<StateSchema> = {
  profile: {
    data: {
      id: '1',
      username: 'Jack',
    },
    form: {
      age: 22,
      avatar: Avatar,
      city: 'New-York',
      country: Country.USA,
      currency: Currency.USD,
      first: 'Jack',
      lastname: 'Smith',
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
  title: 'pages/Profile/ProfilePage/new',
  component: ProfilePage,
  argTypes: {
    background: {
      control: 'color',
    },
  },
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof meta>;

const IndentsDecorator = (Story: StoryFn) => (
  <div style={{ padding: 16 }}>
    <Story />
  </div>
);

// Primary profile page

export const Primary: Story = {
  args: {
    storybookUserId: '1',
  },
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
];

// Dark profile page

export const Dark: Story = {
  args: {
    storybookUserId: '1',
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
  ThemeDecorator(Theme.DARK),
];

// Orange profile page

export const Orange: Story = {
  args: {
    storybookUserId: '1',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
  ThemeDecorator(Theme.ORANGE),
];

// Primary profile page with rating

export const PrimaryRating: Story = {
  args: {
    storybookUserId: '2',
  },
};

PrimaryRating.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
];

// Dark profile page with rating

export const DarkRating: Story = {
  args: {
    storybookUserId: '2',
  },
};

DarkRating.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
  ThemeDecorator(Theme.DARK),
];

// Orange profile page with rating

export const OrangeRating: Story = {
  args: {
    storybookUserId: '2',
  },
};

OrangeRating.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
  ThemeDecorator(Theme.ORANGE),
];

// Error profile page

export const Error: Story = {
  args: {},
};

Error.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateProfile),
];

export default meta;
