import { memo } from 'react';
import { useParams } from 'react-router';

import { ArticleDetails } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const DetailsContainer = memo(({ className }: DetailsContainerProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card border='partial' className={classNames('', {}, [className])} max padding='24'>
      <ArticleDetails id={id} />
    </Card>
  );
});

DetailsContainer.displayName = 'DetailsContainer';
