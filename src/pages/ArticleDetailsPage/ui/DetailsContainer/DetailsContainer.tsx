import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ArticleDetails, getArticleDetailsIsLoading } from '@/entities/Article';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/redesigned/Card';

import classes from './DetailsContainer.module.scss';

interface DetailsContainerProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const DetailsContainer = memo(({ className }: DetailsContainerProps) => {
  const { id } = useParams<{ id: string }>();

  const isLoading = useSelector(getArticleDetailsIsLoading);

  return (
    <Card
      border='partial'
      className={classNames('', { [classes.hidden]: isLoading }, [className])}
      max
      padding='24'
    >
      <ArticleDetails id={id} />
    </Card>
  );
});

DetailsContainer.displayName = 'DetailsContainer';
