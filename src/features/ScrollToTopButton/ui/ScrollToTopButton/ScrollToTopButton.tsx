import { memo } from 'react';

import CircleUpIcon from '@/shared/assets/icons/circle-up-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Icon } from '@/shared/ui/redesigned/Icon';

interface ScrollToTopButtonProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Проверка: рендерится ли компонент для 'storybook'
   */
  isStorybook?: boolean;
}

export const ScrollToTopButton = memo(({ className, isStorybook }: ScrollToTopButtonProps) => {
  const windowWidth = useWindowWidth();

  const onClick = () => {
    if (windowWidth <= 1800 && !isStorybook) {
      // прокрутка добавляется к тегу 'main' на разрешениях меньше '1800px' и не для 'storybook'
      const [mainElement] = document.getElementsByTagName('main');

      mainElement.scrollTo({ behavior: 'smooth', top: 0 });
    } else {
      // прокрутка добавляется к окну браузера на разрешениях больше '1800px' или для 'storybook'
      window.scrollTo({ behavior: 'smooth', top: 0 });
    }
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
