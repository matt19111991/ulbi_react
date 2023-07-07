import { ReactElement, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { StoryFn } from '@storybook/react';

import i18nForStorybook from 'shared/config/i18n/i18nForStorybook';

export const TranslationDecorator = (Story: StoryFn): ReactElement => (
  <Suspense fallback=''>
    <I18nextProvider i18n={i18nForStorybook}>
      <Story />
    </I18nextProvider>
  </Suspense>
);
