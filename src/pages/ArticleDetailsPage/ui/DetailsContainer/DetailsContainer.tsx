import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';

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
    <Card border='partial' className={className} max padding='24'>
      <ArticleDetails id={id} />
    </Card>
  );
});

DetailsContainer.displayName = 'DetailsContainer';
