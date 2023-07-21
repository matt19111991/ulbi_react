import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  callback?: () => void, // функция, которая вызывается, когда пересекли элемент
  triggerRef: MutableRefObject<HTMLElement>; // элемент, при пересечении которого вызывается callback
  wrapperRef: MutableRefObject<HTMLElement>; // элемент, внутри которого находится scroll
}

export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options: IntersectionObserverInit = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver((entries/* , observer */) => {
        const [firstEntry] = entries; // наблюдаем всего за одним элементом

        if (firstEntry.isIntersecting) { // реагируем только на появление в зоне видимости
          callback();
        }
      }, options);

      observer.observe(triggerRef.current);
    }

    return () => {
      if (observer) {
        observer.unobserve(triggerRef!.current);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
