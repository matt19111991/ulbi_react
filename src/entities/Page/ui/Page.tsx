import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';

import { TestProps } from '@/shared/types/tests';

import { getPageScrollByPath } from '../model/selectors/pageScrollSelectors';
import { pageScrollActions } from '../model/slice/pageScrollSlice';

import classes from './Page.module.scss';

interface PageProps extends TestProps {
  /**
   * Содержимое
   */
  children: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Коллбэк, который будет запускаться при достижении самого низа страницы
   */
  onScrollEnd?: () => void;

  /**
   * Нужно ли сохранять позицию прокрутки?
   */
  storableScroll?: boolean;
}

export const Page = ({
  children,
  className,
  onScrollEnd,
  storableScroll = false,
  ...rest
}: PageProps) => {
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const dispatch = useAppDispatch();
  const location = useLocation();

  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollByPath(state, location.pathname),
  );

  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      // после редизайна ссылаемся на область видимости браузера, если 'wrapperRef' не определён
      on: () => undefined,
      off: () => wrapperRef,
    }),
  });

  const onScroll = useThrottle((scrollTop: number) => {
    if (storableScroll) {
      // избегаем очистки скролла при возврате на страницу, где скролл уже был выставлен
      if (!scrollPosition || (scrollTop && scrollPosition)) {
        dispatch(
          pageScrollActions.setScrollPosition({
            path: location.pathname,
            position: scrollTop,
          }),
        );
      }
    }
  }, 500);

  useEffect(() => {
    if (isAppRedesigned) {
      window.document.addEventListener('scroll', () => {
        onScroll(window.scrollY);
      });

      if (!storableScroll) {
        window.scrollTo({ behavior: 'auto', top: 0 });
      }
    }

    return () => {
      if (isAppRedesigned) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [isAppRedesigned, onScroll, storableScroll]);

  const toggleFeaturePageClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => classes.PageRedesigned,
    off: () => classes.Page,
  });

  return (
    <main
      className={classNames(toggleFeaturePageClass, {}, [className])}
      data-testid={rest['data-testid'] ?? 'Page'}
      id={PAGE_ID}
      onScroll={(e) => onScroll(e.currentTarget.scrollTop)}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать callback в 'useInfiniteScroll' */}
      {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
