import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject, ReactNode, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { getPageScrollByPath } from '../model/selectors/pageScrollSelectors';

import { pageScrollActions } from '../model/slice/pageScrollSlice';

import classes from './Page.module.scss';

interface PageProps {
  /**
   * Содержимое
   */
  children: ReactNode;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' для тестов
   */
  'data-testid'?: string;

  /**
   * Состояние загрузки
   */
  loading?: boolean;

  /**
   * Колбэк, который будет запускаться при достижении самого низа страницы
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
  'data-testid': dataTestId = 'Page',
  loading,
  onScrollEnd,
  storableScroll = false,
}: PageProps) => {
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');

  const dispatch = useAppDispatch();
  const location = useLocation();
  const windowWidth = useWindowWidth();

  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollByPath(state, location.pathname),
  );

  const [mounted, setMounted] = useState(false);

  const triggerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // нет отдельного типа 'HTMLMainElement'
  const wrapperRef: MutableRefObject<HTMLElement | null> = useRef(null);

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      /*
        после редизайна для больших экранов ссылаемся на область видимости браузера:
       'wrapperRef' приравниваем к 'undefined'

        для нового дизайна с малым экраном (< 1800px) используем 'wrapperRef'
      */
      on: () => (windowWidth > 1800 ? undefined : wrapperRef),

      off: () => wrapperRef, // для старого дизайна используем 'wrapperRef'
    }),
  });

  const onSetScroll = useThrottle((scrollTop: number) => {
    /*
      запускаем сохранение прокрутки, если для компонента страницы задан флаг 'storableScroll' и
     'location.pathname' равно 'window.location.pathname':
        есть расхождения между 'location.pathname' и 'window.location.pathname' при самом первом
        переходе с 'ArticlesPage' на 'ArticlesDetailsPage',
        без этого сравнения 'ArticlesDetailsPage' будет перезаписывать скролл для 'ArticlesPage'
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

  // обработчик для сохранения прокрутки окна в новом дизайне c большим экраном (> 1800px)
  const onSetWindowScroll = useCallback(() => {
    onSetScroll(window.scrollY);
  }, [onSetScroll]);

  // отлавливаем состояние страницы, когда все данные загружены
  useEffect(() => {
    if (!mounted && !loading) {
      setMounted(true);
    }
  }, [loading, mounted]);

  useEffect(() => {
    // все загрузки для страницы закончены
    if (mounted) {
      // если на странице сохраняется позиция прокрутки
      if (storableScroll) {
        // для нового дизайна и больших экранов (> 1800px)
        if (isAppRedesigned && windowWidth > 1800) {
          /*
            прокручиваем окно на сохраненную позицию

            дополнительно нужно повесить обработчик событий на событие 'scroll' в
            отдельном 'useEffect' для сохранения позиции прокрутки
          */
          window.scrollTo(0, scrollPosition);
        } else if (wrapperRef.current) {
          /*
            прокручиваем компонент страницы на сохраненную позицию для старого дизайна или для
            нового дизайна с малым экраном (< 1800px)
          */
          wrapperRef.current.scrollTop = scrollPosition;
        }
        // если на странице не сохраняется позиция прокрутки
      } else {
        // при монтировании страницу всегда прокручиваем в самый верх
        window.scrollTo({ behavior: 'auto', top: 0 });
      }
    }
  }, [isAppRedesigned, mounted, scrollPosition, storableScroll, windowWidth]);

  // вешаем обработчик для сохранения прокрутки окна для нового дизайна c большим экраном (> 1800px)
  useEffect(() => {
    if (isAppRedesigned && storableScroll && windowWidth > 1800) {
      window.addEventListener('scroll', onSetWindowScroll);
    }

    return () => {
      window.removeEventListener('scroll', onSetWindowScroll);
    };
  }, [isAppRedesigned, onSetWindowScroll, storableScroll, windowWidth]);

  const pageMainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => classes.PageRedesigned,
    off: () => classes.Page,
  });

  return (
    <main
      className={classNames(pageMainClass, {}, [className])}
      data-testid={dataTestId}
      id={PAGE_ID}
      onScroll={(e: UIEvent<HTMLElement>) => onSetScroll((e.target as HTMLElement).scrollTop)}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать 'callback' в 'useInfiniteScroll' */}
      {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
