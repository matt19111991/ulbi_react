import { memo, useState } from 'react';

import StarIcon from '@/shared/assets/icons/star-24-22.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '@/shared/ui/Icon/Icon';

import classes from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  selectedStars?: number;
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(({
  className,
  onSelect,
  selectedStars = 0,
  size = 30,
}: StarRatingProps) => {
  // подсвечиваем текущую и все предыдующие звезды
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

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
    <div className={classNames('', {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={
            classNames(
              classes.starIcon,
              {
                // закрашиваем текущую и все предыдующие звезды
                [classes.hovered]: starNumber <= currentStarsCount,

                [classes.normal]: starNumber > currentStarsCount,

                [classes.selected]: isSelected,
              },
              [],
            )
          }
          height={size}
          key={starNumber}
          onClick={onClick(starNumber)}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          Svg={StarIcon}
          width={size}
        />
      ))}
    </div>
  );
});

StarRating.displayName = 'StarRating';
