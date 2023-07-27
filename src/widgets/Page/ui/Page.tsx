import {
  MutableRefObject,
  ReactNode,
  UIEvent,
  useRef,
} from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from 'app/providers/StoreProvider';

import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

import { getPageScrollByPath } from '../model/selectors/pageScrollSelectors';
import { pageScrollActions } from '../model/slice/pageScrollSlice';

import classes from './Page.module.scss';

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = ({ children, className, onScrollEnd }: PageProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const scrollPosition = useSelector(
    (state: StateSchema) => getPageScrollByPath(state, location.pathname),
  );

  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle(
    (e: UIEvent<HTMLDivElement>) => {
      dispatch(pageScrollActions.setScrollPosition({
        path: location.pathname,
        position: e.currentTarget.scrollTop,
      }));
    },
    500,
  );

  return (
    <section
      className={classNames(classes.Page, {}, [className])}
      id={PAGE_ID}
      onScroll={onScroll}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать callback в 'useInfiniteScroll' */}
      {onScrollEnd ? <div className={classes.trigger} ref={triggerRef} /> : null}
    </section>
  );
};
