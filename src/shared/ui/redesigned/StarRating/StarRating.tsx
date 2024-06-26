import { memo, useEffect, useState } from 'react';

import StarIconDeprecated from '@/shared/assets/icons/star-24-22.svg';
import StarIconRedesigned from '@/shared/assets/icons/star-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Icon as IconDeprecated } from '../../deprecated/Icon';

import { Icon as IconRedesigned } from '../Icon';

import classes from './StarRating.module.scss';

interface StarRatingProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Обработчик нажатия на звезду
   */
  onSelect?: (starsCount: number) => void;

  /**
   * Количество выбранных звезд
   */
  selectedStars?: number;

  /**
   * Размер звезд
   */
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }: StarRatingProps) => {
    // подсвечиваем текущую и все предыдущие звезды
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    /**
     * При переходе на страницу статьи обновляем значение выставленного рейтинга,
     * иначе рейтинг равен '0' - по умолчанию
     */
    useEffect(() => {
      if (selectedStars) {
        setCurrentStarsCount(selectedStars);

        setIsSelected(Boolean(selectedStars));
      }
    }, [selectedStars]);

    /**
     * Обработчик наведения на звезду
     */
    const onHover = (starsCount: number) => () => {
      if (!isSelected) {
        setCurrentStarsCount(starsCount);
      }
    };

    /**
     * Обработчик ухода с компонента звезды
     */
    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarsCount(0);
      }
    };

    /**
     * Обработчик клика по звезде
     */
    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);

        setCurrentStarsCount(starsCount);

        setIsSelected(true);
      }
    };

    const containerClass = classNames(
      toggleFeatures({
        name: 'isAppRedesigned',
        on: () => classes.StarRatingRedesigned,
        off: () => classes.StarRatingDeprecated,
      }),
      {},
      [className],
    );

    return (
      <div className={containerClass}>
        {stars.map((starNumber) => {
          const commonProps = {
            'data-selected': starNumber <= currentStarsCount,
            'data-testid': `StarRating.${starNumber}`,
            height: size,
            onClick: onClick(starNumber),
            onMouseEnter: onHover(starNumber),
            onMouseLeave: onLeave,
            width: size,
          };

          return (
            <ToggleFeatures
              feature='isAppRedesigned'
              key={starNumber}
              on={
                <IconRedesigned
                  // закрашиваем текущую и все предыдущие звезды
                  className={classNames('', { [classes.hovered]: starNumber <= currentStarsCount })}
                  clickable={!isSelected}
                  Svg={StarIconRedesigned}
                  {...commonProps}
                />
              }
              off={
                <IconDeprecated
                  className={classNames(classes.starIcon, {
                    // не закрашиваем звезды после текущей
                    [classes.normal]: starNumber > currentStarsCount,

                    [classes.selected]: isSelected,
                  })}
                  Svg={StarIconDeprecated}
                  {...commonProps}
                />
              }
            />
          );
        })}
      </div>
    );
  },
);

StarRating.displayName = 'StarRating';
