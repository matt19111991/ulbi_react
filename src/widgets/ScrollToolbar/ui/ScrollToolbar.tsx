import { memo } from 'react';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';

import { classNames } from '@/shared/lib/classNames/classNames';

import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Проверка: рендерится ли компонент для 'storybook'
   */
  isStorybook?: boolean;
}

export const ScrollToolbar = memo(({ className, isStorybook }: ScrollToolbarProps) => (
  <VStack className={classNames(classes.ScrollToolbar, {}, [className])} justify='end'>
    <ScrollToTopButton isStorybook={isStorybook} />
  </VStack>
));

ScrollToolbar.displayName = 'ScrollToolbar';
