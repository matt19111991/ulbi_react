import { MutableRefObject, ReactNode, useRef } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

import classes from './Page.module.scss';

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = ({ children, className, onScrollEnd }: PageProps) => {
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  return (
    <section
      className={classNames(classes.Page, {}, [className])}
      ref={wrapperRef}
    >
      {children}

      {/* невидимый элемент внизу страницы, который будет запускать callback в 'useInfiniteScroll' */}
      <div ref={triggerRef} />
    </section>
  );
};
