import type { JSX } from 'react';
import type { StoryContext, StoryFn } from '@storybook/react';

import '@/app/styles/index.scss';

// 'GlobalStyleDecorator' для добавления глобальных стилей для всех 'stories'

export const GlobalStyleDecorator = (Story: StoryFn, context: StoryContext): JSX.Element =>
  Story({}, context);
