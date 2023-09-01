import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from '@/entities/Article';
import { Counter } from '@/entities/Counter';

import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { getFeatureFlag } from '@/shared/lib/features';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slices';

import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
  storybookError?: string;
  storybookId?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({
  className,
  storybookError,
  storybookId,
}: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
  const isCounterEnabled = getFeatureFlag('isCounterEnabled');

  const articleId = __PROJECT__ === 'storybook' ? storybookId : id;

  if (!articleId) {
    return (
      <HStack
        className={classNames(classes.ArticleDetailsPage, {}, [className])}
        justify='center'
        max
      >
        <Text theme={TextTheme.ERROR} title={t('Статья не найдена')} />
      </HStack>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
        <VStack gap='16' max>
          <ArticleDetailsPageHeader />

          <ArticleDetails id={articleId!} />

          {isCounterEnabled && <Counter />}

          {isArticleRatingEnabled && <ArticleRating articleId={articleId} />}

          <ArticleRecommendationsList storybookError={storybookError} />

          <ArticleDetailsComments id={articleId!} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
