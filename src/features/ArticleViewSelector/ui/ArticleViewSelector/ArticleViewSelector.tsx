import { MouseEvent, memo, SVGProps, VFC } from 'react';

import { ArticleView } from '@/entities/Article';

import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import PlaceIconDeprecated from '@/shared/assets/icons/plate-24-24.svg';

import ListIcon from '@/shared/assets/icons/list-redesigned.svg';
import PlaceIcon from '@/shared/assets/icons/plate-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';

import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';

import classes from './ArticleViewSelector.module.scss';

interface ViewType {
  /**
   * Иконка для вида списка статей
   */
  icon: VFC<SVGProps<SVGSVGElement>>;

  /**
   * Значение вида списка статей
   */
  view: ArticleView;
}

interface ArticleViewSelectorProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Обработчик изменения вида списка статей
   */
  onViewClick?: (view: ArticleView) => void;

  /**
   * Выбранный вид списка статей
   */
  selectedView?: ArticleView;
}

const viewTypes: ViewType[] = [
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
    view: ArticleView.LIST,
  },
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => PlaceIcon,
      off: () => PlaceIconDeprecated,
    }),
    view: ArticleView.PLATE,
  },
];

export const ArticleViewSelector = memo(
  ({ className, onViewClick, selectedView }: ArticleViewSelectorProps) => {
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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card
            className={classNames(classes.ArticleViewSelectorRedesigned, {}, [className])}
            border='partial'
          >
            <HStack gap='8'>
              {viewTypes.map((viewType) => (
                <Icon
                  className={classNames(classes.icon, {
                    [classes.selected]: viewType.view === selectedView,
                  })}
                  clickable
                  data-testid={`ArticleView.${viewType.view}`}
                  key={viewType.view}
                  onClick={onClick(viewType.view)} // эквивалент onClick={(e) => onClick(viewType.view)}
                  Svg={viewType.icon}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div className={classNames(classes.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                onClick={onClick(viewType.view)} // эквивалент onClick={(e) => onClick(viewType.view)}
                theme={ButtonTheme.CLEAR}
              >
                <IconDeprecated
                  className={classNames(classes.icon, {
                    [classes.selected]: viewType.view === selectedView,
                  })}
                  data-testid={`ArticleView.${viewType.view}`}
                  height={24}
                  Svg={viewType.icon}
                  width={24}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    );
  },
);

ArticleViewSelector.displayName = 'ArticleViewSelector';
