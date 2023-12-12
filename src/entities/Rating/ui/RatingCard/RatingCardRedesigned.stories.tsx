import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { RatingCard } from './RatingCard';

const meta = {
  title: 'entities/Rating/RatingCard/new',
  component: RatingCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof RatingCard>;

type Story = StoryObj<typeof meta>;

// Primary rating card

export const Primary: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark rating card

export const Dark: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange rating card

export const Orange: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Title rating card

export const Title: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    title: 'Рейтинг',
  },
};

Title.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Feedback rating card

export const Feedback: Story = {
  args: {
    feedbackTitle: 'Оцените нас',
    hasFeedback: true,
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    title: 'Рейтинг',
  },
};

Feedback.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// With rate rating card

export const WithRate: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    rate: 4,
  },
};

WithRate.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Primary mobile rating card

export const PrimaryMobile: Story = {
  args: {
    feedbackTitle: 'Оцените нас',
    hasFeedback: true,
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    storybookMobile: true,
    title: 'Рейтинг',
  },
};

PrimaryMobile.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Dark mobile rating card

export const DarkMobile: Story = {
  args: {
    feedbackTitle: 'Оцените нас',
    hasFeedback: true,
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    storybookMobile: true,
    title: 'Рейтинг',
  },
};

DarkMobile.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

DarkMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Orange mobile rating card

export const OrangeMobile: Story = {
  args: {
    feedbackTitle: 'Оцените нас',
    hasFeedback: true,
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
    storybookMobile: true,
    title: 'Рейтинг',
  },
};

OrangeMobile.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

OrangeMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

export default meta;
