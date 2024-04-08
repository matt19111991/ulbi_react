import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { RatingCard } from './RatingCard';

const meta = {
  title: 'entities/Rating/RatingCard/old',
  component: RatingCard,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'lg',
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof RatingCard>;

type Story = StoryObj<typeof meta>;

// Primary rating card

export const Primary: Story = {
  args: {
    onAccept: action('onAccept'),
  },
};

// Dark rating card

export const Dark: Story = {
  args: {
    onAccept: action('onAccept'),
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange rating card

export const Orange: Story = {
  args: {
    onAccept: action('onAccept'),
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Title rating card

export const Title: Story = {
  args: {
    onAccept: action('onAccept'),
    title: 'Рейтинг',
  },
};

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

// With rate rating card

export const WithRate: Story = {
  args: {
    rate: 4,
  },
};

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
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
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
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

DarkMobile.decorators = [ThemeDecorator(Theme.DARK)];

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
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

OrangeMobile.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
