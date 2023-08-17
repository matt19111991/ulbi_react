import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getArticleDetailsData } from '@/entities/Article';

import { RoutePath } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import { getCanEditArticle } from '../../model/selectors/article/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(({
  className,
}: ArticleDetailsPageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('article-details');

  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <HStack
      className={classNames('', {}, [className])}
      justify='between'
      max
    >
      <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
        {t('Назад к списку')}
      </Button>

      {canEdit && (
        <Button onClick={onEditArticle} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  );
});

ArticleDetailsPageHeader.displayName = 'ArticleDetailsPageHeader';
