import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-redesigned.svg';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';
import type { ArticleTextBlock } from '../../../model/types/article';

import type { ArticleListItemProps } from '../ArticleListItem';

import classes from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo(
  ({ article, className, target, view }: ArticleListItemProps) => {
    const { t } = useTranslation();

    const userInfo = (
      <>
        <Avatar
          className={classes.avatar}
          profileId={article.user.id}
          size={32}
          src={article.user.avatar}
        />

        <Text bold text={article.user.username} />
      </>
    );

    const views = (
      <HStack gap='4'>
        <Icon className={classes.viewsIcon} Svg={EyeIcon} />

        <Text text={String(article.views || 0)} />
      </HStack>
    );

    if (view === ArticleView.LIST) {
      const firstTextBlock = article.blocks.find(
        (block): block is ArticleTextBlock => block.type === ArticleBlockType.TEXT,
      );

      return (
        <Card
          className={classNames('', {}, [className, classes[view]])}
          data-testid='ArticleListItem'
          padding='24'
        >
          <VStack align='start' gap='16'>
            <HStack gap='16'>
              {userInfo}

              <Text text={article.createdAt} />
            </HStack>

            <Text bold className={classes.title} data-testid='Article' title={article.title} />

            <Text className={classes.subtitle} size='s' title={article.subtitle} />

            <AppImage
              alt={article.title}
              className={classes.image}
              loadingFallback={
                <Skeleton className={classes.imageFallback} height={320} width='100%' />
              }
              src={article.img}
            />

            {firstTextBlock?.paragraphs && (
              <Text
                className={classes.textBlock}
                text={firstTextBlock.paragraphs.slice(0, 2).join(' ')}
              />
            )}

            {/*
              для доступности лучше использовать 'AppLink', чем вешать 'onClick' на кнопку

              если кликнуть средней кнопкой мыши на кнопку, то в случае с 'onClick' перехода
              по ссылке не будет, c 'AppLink' переход по ссылке отработает
            */}
            <HStack className={classes.floor} justify='between' max>
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <Button variant='outline'>{t('Читать далее')}...</Button>
              </AppLink>

              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    /*
     для доступности лучше использовать 'AppLink', чем вешать 'onClick' на 'Card'

     если кликнуть средней кнопкой мыши на карточку, то в случае с 'onClick' перехода
     по ссылке не будет, с 'AppLink' переход по ссылке отработает
   */
    return (
      <AppLink
        className={classNames('', {}, [className, classes[view]])}
        data-testid='ArticleListItem'
        target={target}
        to={getRouteArticleDetails(article.id)}
      >
        <Card className={classes.card} padding='0'>
          <AppImage
            alt={article.title}
            className={classes.image}
            loadingFallback={<Skeleton height={248} width='100%' />}
            src={article.img}
          />

          <VStack className={classes.info}>
            <Text className={classes.title} data-testid='Article' text={article.title} />

            <VStack className={classes.footer} justify='end' max>
              <HStack justify='between' max>
                <Text text={article.createdAt} />

                {views}
              </HStack>

              <HStack gap='8' max>
                {userInfo}
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';
