import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign } from 'shared/ui/Text/Text';

import {
  // getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import classes from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article-details');

  // const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <div>
        <Skeleton border='50' className={classes.avatar} height={200} width={200} />
        <Skeleton className={classes.title} height={32} width={300} />
        <Skeleton className={classes.skeleton} height={24} width={600} />
        <Skeleton className={classes.skeleton} height={200} width='100%' />
        <Skeleton className={classes.skeleton} height={200} width='100%' />
      </div>
    );
  } else if (error) {
    content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
  } else {
    // eslint-disable-next-line i18next/no-literal-string
    content = <div>ArticleDetails</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(classes.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});

ArticleDetails.displayName = 'ArticleDetails';
