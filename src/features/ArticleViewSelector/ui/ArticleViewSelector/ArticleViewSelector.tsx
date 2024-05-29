import { memo } from 'react';
import type { FC, MouseEvent, SVGProps } from 'react';

import { ArticleView } from '@/entities/Article';

import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import PlateIconDeprecated from '@/shared/assets/icons/plate-24-24.svg';

import ListIconRedesigned from '@/shared/assets/icons/list-redesigned.svg';
import PlateIconRedesigned from '@/shared/assets/icons/plate-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';

import { Card } from '@/shared/ui/redesigned/Card';
import { Icon as IconRedesigned } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import classes from './ArticleViewSelector.module.scss';

interface ViewType {
  /**
   * Иконка для вида списка статей
   */
  icon: FC<SVGProps<SVGSVGElement>>;

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
      on: () => ListIconRedesigned,
      off: () => ListIconDeprecated,
    }),
    view: ArticleView.LIST,
  },
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => PlateIconRedesigned,
      off: () => PlateIconDeprecated,
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
                <IconRedesigned
                  className={classNames(classes.icon, {
                    [classes.selected]: viewType.view === selectedView,
                  })}
                  clickable
                  data-testid={`ArticleView.${viewType.view}`}
                  key={viewType.view}
                  label={viewType.view}
                  onClick={onClick(viewType.view)} // эквивалент 'onClick={(e) => onClick(viewType.view)}'
                  Svg={viewType.icon}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div className={classNames(classes.ArticleViewSelectorDeprecated, {}, [className])}>
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                onClick={onClick(viewType.view)} // эквивалент 'onClick={(e) => onClick(viewType.view)}'
                theme={ButtonTheme.CLEAR}
              >
                <IconDeprecated
                  className={classNames(classes.icon, {
                    [classes.selected]: viewType.view === selectedView,
                  })}
                  data-testid={`ArticleView.${viewType.view}`}
                  height={24}
                  label={viewType.view}
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
