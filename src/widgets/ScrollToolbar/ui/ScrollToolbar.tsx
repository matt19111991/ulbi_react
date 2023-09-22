import { memo } from 'react';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';

import { classNames } from '@/shared/lib/classNames/classNames';

import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo(({ className }: ScrollToolbarProps) => {
  return (
    <VStack
      align='center'
      className={classNames(classes.ScrollToolbar, {}, [className])}
      justify='end'
      max
    >
      <ScrollToTopButton className={classes.icon} />
    </VStack>
  );
});

ScrollToolbar.displayName = 'ScrollToolbar';
