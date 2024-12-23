import type { JSX } from 'react';
import type { StoryFn } from '@storybook/react';

import '@/app/styles/index.scss';

// 'GlobalStyleDecorator' для добавления глобальных стилей для всех 'stories'

export const GlobalStyleDecorator = (Story: ReturnType<StoryFn>): JSX.Element => <Story />;
