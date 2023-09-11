import { memo, SVGProps, VFC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  // наследуем класс от родителя (для подсветки при наведении на ссылку и названия и иконки)
  inheritParentClassName?: boolean;
  Svg: VFC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable?: true;
  onClick: () => void;
}

type IconsProps = NonClickableIconProps | ClickableIconProps;

// Обёртка для SVG (чтобы применялся цвет соответствующей темы к SVG)

export const Icon = memo(
  ({
    className,
    clickable,
    height = 32,
    inheritParentClassName,
    onClick,
    Svg,
    width = 32,
    ...rest
  }: IconsProps & { onClick?: ClickableIconProps['onClick'] }) => {
    const icon = (
      <Svg
        {...rest}
        className={classNames('', { [classes.Icon]: !inheritParentClassName }, [className])}
        height={height}
        // иначе достается' onClick' из '...rest' и отрабатывает дважды для 'Icon' и 'button'
        onClick={undefined}
        width={width}
      />
    );

    if (clickable) {
      return (
        <button
          className={classes.button}
          onClick={onClick}
          style={{ height, width }}
          type='button'
        >
          {icon}
        </button>
      );
    }

    return icon;
  },
);

Icon.displayName = 'Icon';
