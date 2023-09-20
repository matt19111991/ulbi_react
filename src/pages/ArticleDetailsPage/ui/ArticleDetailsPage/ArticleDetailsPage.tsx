import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from '@/entities/Article';

import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';

import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { ToggleFeatures } from '@/shared/lib/features';

import { Card } from '@/shared/ui/deprecated/Card';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';

import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slices';

import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
  isStorybook?: boolean;
  storybookError?: string;
  storybookId?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({
  className,
  isStorybook = false,
  storybookError,
  storybookId,
}: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <StickyContentLayout
            content={
              <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                  <DetailsContainer />

                  <ArticleRating articleId={articleId} />

                  <ArticleRecommendationsList storybookError={storybookError} />

                  <ArticleDetailsComments id={articleId!} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer isStorybook={isStorybook} />}
          />
        }
        off={
          <Page className={classNames(classes.ArticleDetailsPage, {}, [className])}>
            <VStack gap='16' max>
              <ArticleDetailsPageHeader />

              <ArticleDetails id={articleId!} />

              <ToggleFeatures
                feature='isArticleRatingEnabled'
                on={<ArticleRating articleId={articleId} />}
                off={<Card>{t('Оценка статей скоро появится')}</Card>}
              />

              <ArticleRecommendationsList storybookError={storybookError} />

              <ArticleDetailsComments id={articleId!} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
