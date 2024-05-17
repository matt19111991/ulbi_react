import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { StateSchema } from '@/app/providers/StoreProvider';

import CircleUpIcon from '@/shared/assets/icons/circle-up-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Icon } from '@/shared/ui/redesigned/Icon';

// eslint-disable-next-line path-checker-1911/layer-imports
import { getPageScrollByPath, pageScrollActions } from '@/widgets/Page'; // импорт из виджетов как исключение

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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const windowWidth = useWindowWidth();

  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollByPath(state, location.pathname),
  );

  const onClick = () => {
    if (scrollPosition) {
      dispatch(
        pageScrollActions.setScrollPosition({
          path: location.pathname,
          position: 0,
        }),
      );
    }

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
