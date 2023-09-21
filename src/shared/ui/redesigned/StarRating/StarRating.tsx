import { memo, useEffect, useState } from 'react';

import StarIconDeprecated from '@/shared/assets/icons/star-24-22.svg';
import StarIconRedesigned from '@/shared/assets/icons/star-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon';

import { Icon as IconRedesigned } from '../Icon';

import classes from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  selectedStars?: number;
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(
  ({ className, onSelect, selectedStars = 0, size = 30 }: StarRatingProps) => {
    // подсвечиваем текущую и все предыдующие звезды
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    useEffect(() => {
      setCurrentStarsCount(selectedStars);
    }, [selectedStars]);

    const onHover = (starsCount: number) => () => {
      if (!isSelected) {
        setCurrentStarsCount(starsCount);
      }
    };

    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarsCount(0);
      }
    };

    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);

        setCurrentStarsCount(starsCount);
        setIsSelected(true);
      }
    };

    return (
      <div
        className={classNames(
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => classes.StarRatingRedesigned,
            off: () => classes.StarRatingDeprecated,
          }),
          {},
          [className],
        )}
      >
        {stars.map((starNumber) => {
          const commonProps = {
            className: classNames(
              classes.starIcon,
              {
                // закрашиваем текущую и все предыдущие звезды
                [classes.hovered]: starNumber <= currentStarsCount,

                [classes.normal]: starNumber > currentStarsCount,

                [classes.selected]: isSelected,
              },
              [],
            ),
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
                <IconRedesigned {...commonProps} clickable={!isSelected} Svg={StarIconRedesigned} />
              }
              off={<IconDeprecated {...commonProps} Svg={StarIconDeprecated} />}
            />
          );
        })}
      </div>
    );
  },
);

StarRating.displayName = 'StarRating';
