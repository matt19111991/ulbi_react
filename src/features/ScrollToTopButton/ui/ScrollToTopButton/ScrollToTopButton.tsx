import { memo } from 'react';

import CircleUpIcon from '@/shared/assets/icons/circle-up-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '@/shared/ui/redesigned/Icon';

interface ScrollToTopButtonProps {
  /**
   * Внешний класс
   */
  className?: string;
}

// TODO: Исправить прокрутку вверх страницы на responsive девайсах

export const ScrollToTopButton = memo(({ className }: ScrollToTopButtonProps) => {
  const onClick = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };

  return (
    <Icon
      className={classNames('', {}, [className])}
      clickable
      height={32}
      onClick={onClick}
      Svg={CircleUpIcon}
      width={32}
    />
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';
