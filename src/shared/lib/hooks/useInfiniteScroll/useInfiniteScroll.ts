import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

interface UseInfiniteScrollOptions {
  /**
   * Функция, которая вызывается, когда достигнут элемент-триггер
   */
  callback?: () => void;

  /**
   * Элемент-триггер, при пересечении которого вызывается 'callback'
   */
  triggerRef: MutableRefObject<HTMLDivElement | null>;

  /**
   * Прокручиваемый элемент, внутри которого находится элемент-триггер
   */
  wrapperRef?: MutableRefObject<HTMLElement | null>;
}

/**
 * Хук для использования бесконечной прокрутки
 */
export const useInfiniteScroll = ({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    // нужно изолировать (замкнуть) 'triggerRef' внутри 'useEffect', иначе 'callback' не запустится
    const triggerElement = triggerRef.current;

    // ссылаемся на область видимости браузера, если 'wrapperRef' === null
    const wrapperElement = wrapperRef?.current || null;

    const options: IntersectionObserverInit = {
      /*
        элемент, который используется в качестве области просмотра для проверки видимости
        целевого элемента, должен быть предком целевого элемента,
        по умолчанию используется область видимости браузера (если элемент 'undefined' или 'null')
      */
      root: wrapperElement,

      rootMargin: '0px', // отступы вокруг 'wrapperElement'

      threshold: 1.0, // 'callback' будет вызван при 100% пересечении 'triggerElement'
    };

    const observer = new IntersectionObserver((entries /* , observer */) => {
      const [firstEntry] = entries; // наблюдаем всего за одним элементом

      // реагируем только на появление в зоне видимости
      if (firstEntry.isIntersecting && callback) {
        callback();
      }
    }, options);

    if (triggerElement) {
      observer.observe(triggerElement);
    }

    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
