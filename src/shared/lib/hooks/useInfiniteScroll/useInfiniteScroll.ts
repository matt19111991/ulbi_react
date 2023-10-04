import { MutableRefObject, useEffect } from 'react';

/**
 * Хук для использования бесконечной прокрутки
 */

interface UseInfiniteScrollOptions {
  /**
   * Функция, которая вызывается, когда пересекли элемент
   */
  callback?: () => void;

  /**
   * Элемент, при пересечении которого вызывается callback
   */
  triggerRef: MutableRefObject<HTMLElement>;

  /**
   * Элемент, внутри которого находится scroll
   */
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    /*
      Нужно изолировать (замкнуть) 'triggerRef' и 'wrapperRef' внутри 'useEffect', иначе ошибка:
      'Uncaught TypeError: Failed to execute 'unobserve' on 'IntersectionObserver':
      parameter 1 is not of type 'Element' при переходе на 'ArticleDetailsPage'
      (клик на 'Читать далее...')

      Используем 'triggerElement' и 'wrapperElement' внутри 'if (callback)' условия
    */

    const triggerElement = triggerRef.current;

    // ссылаемся на область видимости браузера, если 'wrapperRef' === null
    const wrapperElement = wrapperRef?.current || null;

    if (callback) {
      const options: IntersectionObserverInit = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver((entries /* , observer */) => {
        const [firstEntry] = entries; // наблюдаем всего за одним элементом

        // реагируем только на появление в зоне видимости
        if (firstEntry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement && wrapperElement) {
        observer.unobserve(wrapperElement!);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
