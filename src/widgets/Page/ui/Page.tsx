import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { PAGE_ID } from '@/shared/const/page';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';

import { TestProps } from '@/shared/types/tests';

import { getPageScrollByPath } from '../model/selectors/pageScrollSelectors';
import { pageScrollActions } from '../model/slice/pageScrollSlice';

import classes from './Page.module.scss';

interface PageProps extends TestProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = ({ children, className, onScrollEnd, ...rest }: PageProps) => {
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

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;

    dispatch(
      pageScrollActions.setScrollPosition({
        path: location.pathname,
        position: 0,
      }),
    );
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    // избегаем очистки скролла при возврате на страницу, где скролл уже был выставлен
    if (!scrollPosition || (e.currentTarget.scrollTop && scrollPosition)) {
      dispatch(
        pageScrollActions.setScrollPosition({
          path: location.pathname,
          position: e.currentTarget.scrollTop,
        }),
      );
    }
  }, 500);

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
      onScroll={onScroll}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать callback в 'useInfiniteScroll' */}
      {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
    </main>
  );
};
