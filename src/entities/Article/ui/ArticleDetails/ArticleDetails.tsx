import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

import { getRouteArticles } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { DynamicModuleLoaderV2 } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { ToggleFeatures } from '@/shared/lib/features';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { ArticleBlockPicker } from '../../lib/components/ArticleBlockPicker/ArticleBlockPicker';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import classes from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' статьи
   */
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const DeprecatedArticleDetails = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify='center' max>
        <AvatarDeprecated className={classes.avatar} size={200} src={article?.img} />
      </HStack>

      <VStack align='start' data-testid='ArticleDetails.Info' gap='4' max>
        <TextDeprecated size={TextSize.L} text={article?.subtitle} title={article?.title} />

        <HStack gap='8'>
          <IconDeprecated Svg={EyeIcon} />

          <TextDeprecated text={String(article?.views || 0)} />
        </HStack>

        <HStack gap='8'>
          <IconDeprecated Svg={CalendarIcon} />

          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map((block) => <ArticleBlockPicker block={block} key={block.id} />)}
    </>
  );
};

const RedesignedArticleDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('article-details');

  const article = useSelector(getArticleDetailsData);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  return (
    <>
      <HStack className={classes.stack} justify='between' max>
        <TextRedesigned
          className={classes.title}
          bold
          data-testid='ArticleDetails.Info'
          size='l'
          title={article?.title}
        />

        <Button onClick={onBackToList} variant='outline'>
          {t('Назад к списку')}
        </Button>
      </HStack>

      <TextRedesigned className={classes.subtitle} title={article?.subtitle} />

      <AppImage
        className={classes.img}
        loadingFallback={<SkeletonRedesigned height={420} width='100%' />}
        src={article?.img}
      />

      {article?.blocks.map((block) => <ArticleBlockPicker block={block} key={block.id} />)}
    </>
  );
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article-details');

  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  });

  let content: JSX.Element;

  if (isLoading) {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <>
            <SkeletonRedesigned height={40} width={300} />
            <SkeletonRedesigned height={32} width={600} />
            <SkeletonRedesigned height={819} width='100%' />
            <SkeletonRedesigned height={200} width='100%' />
            <SkeletonRedesigned height={200} width='100%' />
          </>
        }
        off={
          <>
            <SkeletonDeprecated border='50%' className={classes.avatar} height={200} width={200} />
            <SkeletonDeprecated height={32} width={300} />
            <SkeletonDeprecated height={24} width={600} />
            <SkeletonDeprecated height={200} width='100%' />
            <SkeletonDeprecated height={200} width='100%' />
          </>
        }
      />
    );
  } else if (error) {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <HStack justify='center' max>
            <TextRedesigned title={t('Произошла ошибка при загрузке статьи')} variant='error' />
          </HStack>
        }
        off={
          <TextDeprecated
            theme={TextTheme.ERROR}
            title={t('Произошла ошибка при загрузке статьи')}
          />
        }
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<RedesignedArticleDetails />}
        off={<DeprecatedArticleDetails />}
      />
    );
  }

  return (
    <DynamicModuleLoaderV2 reducers={reducers}>
      <VStack align='start' className={classNames('', {}, [className])} gap='16' max>
        {content}
      </VStack>
    </DynamicModuleLoaderV2>
  );
});

ArticleDetails.displayName = 'ArticleDetails';
