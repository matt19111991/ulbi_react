import {
  MouseEvent,
  memo,
  SVGProps,
  VFC,
} from 'react';

import { ArticleView } from 'entities/Article';

import ListIcon from 'shared/assets/icons/list-24-24.svg';
import PlaceIcon from 'shared/assets/icons/plate-24-24.svg';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

import classes from './ArticleViewSelector.module.scss';

interface ViewType {
  icon: VFC<SVGProps<SVGSVGElement>>;
  view: ArticleView;
}

interface ArticleViewSelectorProps {
  className?: string;
  onViewClick?: (view: ArticleView) => void;
  selectedView?: ArticleView;
}

const viewTypes: ViewType[] = [
  { icon: ListIcon, view: ArticleView.LIST },
  { icon: PlaceIcon, view: ArticleView.PLATE },
];

export const ArticleViewSelector = memo(({
  className,
  onViewClick,
  selectedView,
}: ArticleViewSelectorProps) => {
/*
   эквивалент 'onClick', который идет ниже:

   const onClick = (newView: ArticleView) => {
     onViewClick?.(newView);
   };
*/
  // eslint-disable-next-line no-unused-vars
  const onClick = (newView: ArticleView) => (e: MouseEvent<HTMLButtonElement>) => {
    onViewClick?.(newView);
  };

  if (!selectedView) {
    return null;
  }

  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          onClick={onClick(viewType.view)} // эквивалент onClick={(e) => onClick(viewType.view)}
          theme={ButtonTheme.CLEAR}
        >
          <Icon
            className={
              classNames(classes.icon, {
                [classes.selected]: viewType.view === selectedView,
              })
            }
            Svg={viewType.icon}
          />
        </Button>
      ))}
    </div>
  );
});

ArticleViewSelector.displayName = 'ArticleViewSelector';
