import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';

import { getPageScrollByPath } from '../model/selectors/pageScrollSelectors';
import { pageScrollActions } from '../model/slice/pageScrollSlice';

import type { TestProps } from '../model/types/page';

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
   * Состояние загрузки
   */
  loading?: boolean;

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
  loading,
  onScrollEnd,
  storableScroll = false,
  ...rest
}: PageProps) => {
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const dispatch = useAppDispatch();
  const location = useLocation();

  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollByPath(state, window.location.pathname),
  );

  const [mounted, setMounted] = useState(false);

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

  const onSetScroll = useThrottle((scrollTop: number) => {
    /*
      запускаем прокрутку, если для компонента страницы задан флаг 'storableScroll' и
      'location.pathname' равно 'window.location.pathname':

      - есть расхождения между 'location.pathname' и 'window.location.pathname';
        для 'location.pathname' нет разницы между страницами со списком статей и c одной статьей;
        без сравнения страница 'ArticlesDetailsPage' будет перезаписывать скролл для 'ArticlesPage'
    */
    if (storableScroll && location.pathname === window.location.pathname) {
      dispatch(
        pageScrollActions.setScrollPosition({
          path: location.pathname,
          position: scrollTop,
        }),
      );
    }
  }, 500);

  const onSetScrollEventCallback = useCallback(() => {
    onSetScroll(window.scrollY);
  }, [onSetScroll]);

  // отлавливаем состояние страницы, когда все данные загружены
  useEffect(() => {
    if (!mounted && !loading) {
      setMounted(true);
    }
  }, [loading, mounted]);

  // вешаем обработчики прокрутки на документ для страниц в новом дизайне
  useEffect(() => {
    if (isAppRedesigned && storableScroll) {
      window.addEventListener('scroll', onSetScrollEventCallback);
    }

    return () => {
      window.removeEventListener('scroll', onSetScrollEventCallback);
    };
  }, [isAppRedesigned, onSetScrollEventCallback, storableScroll]);

  useEffect(() => {
    // все загрузки для страницы закончены
    if (mounted) {
      // если на странице сохраняется позиция прокрутки
      if (storableScroll) {
        // для нового дизайна
        if (isAppRedesigned) {
          // прокручиваем документ на сохраненную позицию
          window.scrollTo(0, scrollPosition);
        } else if (wrapperRef) {
          // прокручиваем компонент страницы на сохраненную позицию
          wrapperRef.current.scrollTop = scrollPosition;
        }
        // если на странице не сохраняется позиция прокрутки
      } else {
        // при монтировании страницу всегда прокручиваем в самый верх
        window.scrollTo({ behavior: 'auto', top: 0 });
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isAppRedesigned, mounted, storableScroll]);

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
      onScroll={(e) => onSetScroll(e.currentTarget.scrollTop)}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать callback в 'useInfiniteScroll' */}
      {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
