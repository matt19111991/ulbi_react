import { StoryObj } from '@storybook/react';

import 'app/styles/index.scss';

// GlobalStyleDecorator для добавления глобальных стилей для всех stories

export const GlobalStyleDecorator = (Story: StoryObj): StoryObj => Story;
