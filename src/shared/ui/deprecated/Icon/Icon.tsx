import { memo } from 'react';
import type { FC, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import type { Mods } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

// в дополнение к 'IconProps' для 'Icon' компонента будут предлагаться 'SVG-props'
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
   * Лэйбл
   */
  label?: string;

  /**
   * 'SVG' изображение (компонент)
   */
  Svg: FC<SVGProps<SVGSVGElement>>;
}

// Обёртка для 'SVG' (чтобы применялся цвет соответствующей темы к 'SVG')

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Icon = memo(
  ({ className, inverted, label = 'icon-button', Svg, ...rest }: IconProps) => {
    const mods: Mods = {
      [classes.inverted]: inverted,
      [classes.primary]: !inverted,
    };

    return <Svg aria-label={label} className={classNames('', mods, [className])} {...rest} />;
  },
);

Icon.displayName = 'Icon';
