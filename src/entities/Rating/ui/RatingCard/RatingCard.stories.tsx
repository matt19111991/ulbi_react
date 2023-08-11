import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { RatingCard } from './RatingCard';

const meta = {
  title: 'entities/RatingCard',
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

// Dark rating card

export const Dark: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange rating card

export const Orange: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Title rating card

export const Title: Story = {
  args: {
    onAccept: action('onAccept'),
    onCancel: action('onCancel'),
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

DarkMobile.decorators = [ThemeDecorator(Theme.DARK)];

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

OrangeMobile.decorators = [ThemeDecorator(Theme.ORANGE)];

OrangeMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

export default meta;
