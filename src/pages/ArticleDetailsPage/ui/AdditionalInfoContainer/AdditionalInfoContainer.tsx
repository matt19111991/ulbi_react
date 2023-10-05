import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData, getArticleDetailsIsLoading } from '@/entities/Article';

import { getRouteArticleEdit } from '@/shared/const/router';

import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import classes from './AdditionalInfoContainer.module.scss';

interface AdditionalInfoContainerProps {
  /**
   * Проверка: рендерится ли компонент для storybook
   */
  isStorybook?: boolean;
}

export const AdditionalInfoContainer = memo(
  ({ isStorybook = false }: AdditionalInfoContainerProps) => {
    const navigate = useNavigate();

    const article = useSelector(getArticleDetailsData);
    const loading = useSelector(getArticleDetailsIsLoading);

    const onEditArticle = useCallback(() => {
      if (article) {
        navigate(getRouteArticleEdit(article.id));
      }
    }, [article, navigate]);

    if (loading) {
      return (
        <Card border='partial' className={classes.skeletonCard} padding='24'>
          <VStack align='start' gap='16'>
            <Skeleton height={28} width={165} />
            <Skeleton height={28} width={137} />
            <Skeleton height={30} width={110} />
          </VStack>
        </Card>
      );
    }

    if (!article) {
      return null;
    }

    return (
      <Card border='partial' className={classes.card} padding='24'>
        <ArticleAdditionalInfo
          author={article.user}
          createdAt={article.createdAt}
          onEdit={onEditArticle}
          isStorybook={isStorybook}
          views={article.views}
        />
      </Card>
    );
  },
);

AdditionalInfoContainer.displayName = 'AdditionalInfoContainer';
