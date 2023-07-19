import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import { ArticleBlock, ArticleBlockType } from '../../model/types/article';

import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';

import {
  ArticleImageBlockComponent,
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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

  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);
  const isLoading = useSelector(getArticleDetailsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  });

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            block={block}
            className={classes.block}
            key={block.id}
          />
        );

      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            block={block}
            className={classes.block}
            key={block.id}
          />
        );

      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            block={block}
            className={classes.block}
            key={block.id}
          />
        );

      default:
        return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton border='50' className={classes.avatar} height={200} width={200} />
        <Skeleton className={classes.title} height={32} width={300} />
        <Skeleton className={classes.skeleton} height={24} width={600} />
        <Skeleton className={classes.skeleton} height={200} width='100%' />
        <Skeleton className={classes.skeleton} height={200} width='100%' />
      </>
    );
  } else if (error) {
    content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />;
  } else {
    content = (
      <>
        <div className={classes.avatarWrapper}>
          <Avatar className={classes.avatar} size={200} src={article?.img} />
        </div>

        <Text
          className={classes.title}
          size={TextSize.L}
          text={article?.subtitle}
          title={article?.title}
        />

        <div className={classes.articleInfo}>
          <Icon className={classes.icon} Svg={EyeIcon} />

          <Text text={String(article?.views)} />
        </div>

        <div className={classes.articleInfo}>
          <Icon className={classes.icon} Svg={CalendarIcon} />

          <Text text={article?.createdAt} />
        </div>

        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(classes.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});

ArticleDetails.displayName = 'ArticleDetails';
