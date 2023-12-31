import { FC, memo, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Инвертировать тему для иконки?
   */
  inverted?: boolean;

  /**
   * SVG изображение
   */
  Svg: FC<SVGProps<SVGSVGElement>>;
}

// Обёртка для SVG (чтобы применялся цвет соответствующей темы к SVG)

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Icon = memo(({ className, inverted, Svg, ...rest }: IconProps) => (
  <Svg
    className={classNames(inverted ? classes.inverted : classes.Icon, {}, [className])}
    {...rest}
  />
));

Icon.displayName = 'Icon';
