import { memo, SVGProps, VFC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  inverted?: boolean;
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

// Обёртка для SVG (чтобы применялся цвет соответствующей темы к SVG)

export const Icon = memo(({
  className,
  inverted,
  Svg,
  ...rest
}: IconProps) => (
  <Svg
    className={
      classNames(
        inverted ? classes.inverted : classes.Icon,
        {},
        [className],
      )
    }
    {...rest}
  />
));

Icon.displayName = 'Icon';
