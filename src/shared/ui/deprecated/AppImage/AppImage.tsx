import { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  errorFallback?: ReactElement;
  loadingFallback?: ReactElement;
  storybookLoading?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const AppImage = memo(
  ({
    alt = 'image',
    className,
    errorFallback,
    loadingFallback,
    src,
    storybookLoading,
    ...rest
  }: AppImageProps) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 'useEffect' - асинхронный, срабатывает после монтирования компонента
    // 'useLayoutEffect' - синхронный, срабатывает до монтирования компонента

    // проверяем, доступно ли изображение
    useLayoutEffect(() => {
      const img = new Image();

      img.src = src ?? '';

      img.onload = () => {
        setIsLoading(false);
      };

      img.onerror = () => {
        setIsLoading(false);

        setHasError(true);
      };
    }, [src]);

    if ((isLoading || storybookLoading) && loadingFallback) {
      return loadingFallback;
    }

    if (hasError && errorFallback) {
      return errorFallback;
    }

    return <img alt={alt} className={className} src={src} {...rest} />;
  },
);

AppImage.displayName = 'AppImage';
